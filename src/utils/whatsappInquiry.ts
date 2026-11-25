import { SITE_CONFIG } from '@/src/config/site';
import type {
  DogInquiryAccessoryRef,
  DogInquiryFormValues,
  DogListing,
  InquiryType,
  Language,
  WhatsAppActionState,
} from '@/src/types';
import { getEffectiveDocStatus } from './dogFilter';
import { canSubmitRealInquiry } from './register';

const ARABIC_INDIC_DIGITS: Record<string, string> = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};

export const INQUIRY_MAX_MESSAGE_LENGTH = 300;

export function normalizeDigitsToAscii(input: string): string {
  return input
    .split('')
    .map((ch) => ARABIC_INDIC_DIGITS[ch] ?? ch)
    .join('');
}

export interface EgyptianMobileResult {
  valid: boolean;
  local?: string;
  e164?: string;
  digitsOnly?: string;
}

/**
 * Validates Egyptian mobile numbers (010 / 011 / 012 / 015 + 8 digits).
 * Accepts local 01XXXXXXXXX or +20 / 201XXXXXXXXX after digit normalization.
 */
export function normalizeEgyptianMobile(raw: string): EgyptianMobileResult {
  const ascii = normalizeDigitsToAscii(raw);
  const digits = ascii.replace(/[^\d]/g, '');

  let local: string | null = null;
  if (/^01[0125]\d{8}$/.test(digits)) {
    local = digits;
  } else if (/^201[0125]\d{8}$/.test(digits)) {
    local = `0${digits.slice(2)}`;
  } else if (/^00201[0125]\d{8}$/.test(digits)) {
    local = `0${digits.slice(4)}`;
  }

  if (!local) {
    return { valid: false };
  }

  const digitsOnly = `20${local.slice(1)}`;
  return {
    valid: true,
    local,
    e164: `+${digitsOnly}`,
    digitsOnly,
  };
}

export interface DogInquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof DogInquiryFormValues, 'required' | 'min_length' | 'invalid_phone' | 'max_length'>>;
}

export function validateDogInquiryForm(
  values: DogInquiryFormValues
): DogInquiryValidationResult {
  const errors: DogInquiryValidationResult['errors'] = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'required';
  } else if (trimmedName.length < 2) {
    errors.name = 'min_length';
  }

  const phoneResult = normalizeEgyptianMobile(values.phone);
  if (!values.phone.trim()) {
    errors.phone = 'required';
  } else if (!phoneResult.valid) {
    errors.phone = 'invalid_phone';
  }

  if (!values.areaId.trim()) {
    errors.areaId = 'required';
  }

  if (values.message.trim().length > INQUIRY_MAX_MESSAGE_LENGTH) {
    errors.message = 'max_length';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Strictly separates message preview/copy from permitting an actual WhatsApp send link.
 * - Demo listings (`isDemo: true`) and `sold` listings can NEVER open a real WhatsApp inquiry link,
 *   even if a real business number is configured.
 * - Message preview and clipboard copy remain available for testing/inspection.
 */
export function getWhatsAppActionState(
  dog: Pick<DogListing, 'isDemo' | 'availability'>,
  whatsappNumber: string = SITE_CONFIG.whatsappNumber
): WhatsAppActionState {
  if (dog.isDemo) {
    return {
      canOpenWhatsApp: false,
      canPreviewAndCopy: true,
      reason: 'blocked_demo',
    };
  }

  if (dog.availability === 'sold') {
    return {
      canOpenWhatsApp: false,
      canPreviewAndCopy: true,
      reason: 'blocked_sold',
    };
  }

  const shopPhone = normalizeEgyptianMobile(whatsappNumber);
  if (!shopPhone.valid || !shopPhone.digitsOnly) {
    return {
      canOpenWhatsApp: false,
      canPreviewAndCopy: true,
      reason: 'not_configured',
    };
  }

  return {
    canOpenWhatsApp: true,
    canPreviewAndCopy: true,
    reason: 'allowed',
  };
}

const INQUIRY_TYPE_LABELS: Record<InquiryType, { ar: string; en: string }> = {
  more_info: { ar: 'معلومات أكتر عن الكلب', en: 'More information' },
  viewing: { ar: 'حجز موعد عشان أشوف الكلب', en: 'Book an in-person viewing' },
  price: { ar: 'السؤال عن السعر', en: 'Ask about price' },
  delivery: { ar: 'التوصيل أو الاستلام', en: 'Delivery or pickup' },
};

const DOC_KEY_LABELS = {
  vaccination: { ar: 'التطعيمات', en: 'Vaccination' },
  deworming: { ar: 'الديدان', en: 'Deworming' },
  health_booklet: { ar: 'الكتيب الصحي', en: 'Health booklet' },
  pedigree: { ar: 'شهادة النسب', en: 'Pedigree' },
} as const;

const DOC_STATUS_LABELS = {
  verified: { ar: 'موثّق بورق', en: 'Verified' },
  partially_documented: { ar: 'متوثّق جزئياً', en: 'Partially documented' },
  not_documented: { ar: 'مفيش ورق', en: 'No document' },
  not_provided: { ar: 'لسه متضافش', en: 'Not listed' },
} as const;

export function buildDocSummaryLine(dog: DogListing, lang: Language): string {
  const parts = dog.documentation
    .filter((item) => item.applicable !== false)
    .map((item) => {
      const effectiveStatus = getEffectiveDocStatus(item);
      return `${DOC_KEY_LABELS[item.key][lang]}: ${DOC_STATUS_LABELS[effectiveStatus][lang]}`;
    });

  const summary = parts.join(' · ');
  if (!summary) return '';

  if (dog.isDemo) {
    return lang === 'ar'
      ? `${summary} (بيانات ومستندات تجريبية للمعاينة فقط)`
      : `${summary} (demo sample records only)`;
  }

  return summary;
}

export function buildDogInquiryMessage(params: {
  dog: DogListing;
  form: DogInquiryFormValues;
  lang: Language;
  listingUrl?: string;
  areaLabel?: string;
  selectedAccessories?: DogInquiryAccessoryRef[];
}): string {
  const { dog, form, lang, listingUrl, areaLabel, selectedAccessories } = params;
  const phoneNormalized = normalizeEgyptianMobile(form.phone);
  const displayPhone = phoneNormalized.e164 ?? form.phone.trim();
  const resolvedArea =
    areaLabel?.trim() ||
    SITE_CONFIG.alexandriaAreas.find((a) => a.id === form.areaId)?.[lang] ||
    form.areaId.trim();
  const docSummary = buildDocSummaryLine(dog, lang);
  const inquiryLabel = INQUIRY_TYPE_LABELS[form.inquiryType][lang];
  const genderLabel =
    dog.gender === 'male'
      ? lang === 'ar'
        ? 'ذكر'
        : 'Male'
      : lang === 'ar'
      ? 'أنثى'
      : 'Female';

  const lines: string[] = [];

  if (dog.isDemo) {
    lines.push(
      lang === 'ar'
        ? '[معاينة تجريبية — ده مش كلب متاح للبيع ولا يمثل طلب شراء حقيقي]'
        : '[DEMO PREVIEW — Not a real dog for sale and not a real inquiry]'
    );
  }

  if (lang === 'ar') {
    lines.push(`السلام عليكم، أنا ${form.name.trim()}.`);
    lines.push('بسأل عن الكلب ده في ALI PETS:');
    lines.push(`• الرقم المرجعي: ${dog.listingId}`);
    lines.push(`• السلالة: ${dog.breed.ar}`);
    if (dog.ageLabel.ar.trim()) {
      lines.push(`• العمر: ${dog.ageLabel.ar.trim()}`);
    }
    lines.push(`• الجنس: ${genderLabel}`);
    if (typeof dog.priceEgp === 'number' && Number.isFinite(dog.priceEgp)) {
      lines.push(`• السعر المعروض: ${dog.priceEgp.toLocaleString('en-US')} ج.م`);
    }
    if (docSummary) {
      lines.push(`• التوثيق حسب الموقع: ${docSummary}`);
    }
    lines.push(`نوع الاستفسار: ${inquiryLabel}`);
    if (resolvedArea) {
      lines.push(`المنطقة: ${resolvedArea}`);
    }
    if (displayPhone) {
      lines.push(`رقم التواصل: ${displayPhone}`);
    }
    if (form.message.trim()) {
      lines.push(`ملاحظة: ${form.message.trim()}`);
    }
    if (selectedAccessories && selectedAccessories.length > 0) {
      lines.push('إكسسوارات أرغب في معرفة أسعارها وتوافرها:');
      for (const acc of selectedAccessories) {
        lines.push(`• ${acc.name.ar}`);
      }
    }
    if (listingUrl?.trim()) {
      lines.push(`رابط الكلب: ${listingUrl.trim()}`);
    }
  } else {
    lines.push(`Hello, I am ${form.name.trim()}.`);
    lines.push('I would like to ask about this dog at ALI PETS:');
    lines.push(`• Reference ID: ${dog.listingId}`);
    lines.push(`• Breed: ${dog.breed.en}`);
    if (dog.ageLabel.en.trim()) {
      lines.push(`• Age: ${dog.ageLabel.en.trim()}`);
    }
    lines.push(`• Gender: ${genderLabel}`);
    if (typeof dog.priceEgp === 'number' && Number.isFinite(dog.priceEgp)) {
      lines.push(`• Listed Price: ${dog.priceEgp.toLocaleString('en-US')} EGP`);
    }
    if (docSummary) {
      lines.push(`• Documentation on site: ${docSummary}`);
    }
    lines.push(`Inquiry Type: ${inquiryLabel}`);
    if (resolvedArea) {
      lines.push(`Area: ${resolvedArea}`);
    }
    if (displayPhone) {
      lines.push(`Phone: ${displayPhone}`);
    }
    if (form.message.trim()) {
      lines.push(`Note: ${form.message.trim()}`);
    }
    if (selectedAccessories && selectedAccessories.length > 0) {
      lines.push('Accessories I would like to ask about pricing & availability for:');
      for (const acc of selectedAccessories) {
        lines.push(`• ${acc.name.en}`);
      }
    }
    if (listingUrl?.trim()) {
      lines.push(`Listing URL: ${listingUrl.trim()}`);
    }
  }

  return lines.join('\n');
}

/**
 * Builds a real `wa.me` URL ONLY when `canSubmitRealInquiry(dog)` is true and `whatsappNumber` is configured.
 * Returns `null` for all demo listings, sold listings, or unconfigured numbers.
 */
export function buildDogInquiryWhatsAppUrl(params: {
  dog: Pick<DogListing, 'isDemo' | 'availability'>;
  message: string;
  whatsappNumber?: string;
}): string | null {
  const { dog, message, whatsappNumber = SITE_CONFIG.whatsappNumber } = params;

  if (!canSubmitRealInquiry(dog as DogListing)) {
    return null;
  }

  const state = getWhatsAppActionState(dog, whatsappNumber);
  if (!state.canOpenWhatsApp || state.reason !== 'allowed') {
    return null;
  }

  const shopPhone = normalizeEgyptianMobile(whatsappNumber);
  if (!shopPhone.valid || !shopPhone.digitsOnly) return null;

  return `https://wa.me/${shopPhone.digitsOnly}?text=${encodeURIComponent(message)}`;
}
