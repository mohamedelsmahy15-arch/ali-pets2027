import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDogInquiryMessage,
  buildDogInquiryWhatsAppUrl,
  getWhatsAppActionState,
  normalizeEgyptianMobile,
  validateDogInquiryForm,
} from './whatsappInquiry';
import { DEMO_DOGS } from '../data/dogs';
import type { DogInquiryFormValues, DogListing } from '../types';

const REAL_AVAILABLE_DOG: DogListing = {
  listingId: 'AP-REAL-101',
  isDemo: false,
  illustrative: false,
  breedKey: 'golden-retriever',
  breed: { ar: 'جولدن ريتريفر', en: 'Golden Retriever' },
  title: { ar: 'جرو جولدن ريتريفر', en: 'Golden Retriever Puppy' },
  ageMonths: 3,
  ageLabel: { ar: '3 شهور', en: '3 months' },
  gender: 'male',
  coatColor: { ar: 'ذهبي', en: 'Gold' },
  sizeCategory: 'large',
  priceEgp: 14500,
  availability: 'available',
  documentation: [
    {
      key: 'vaccination',
      status: 'verified',
      sourceName: 'Smouha Vet Clinic',
      documentDate: '2026-11-10',
      documentImages: ['/real-doc.jpg'],
    },
    {
      key: 'health_booklet',
      status: 'not_documented',
    },
  ],
  media: [],
  createdAt: '2026-11-24T12:00:00Z',
};

const VALID_FORM: DogInquiryFormValues = {
  name: 'أحمد علي',
  phone: '01012345678',
  areaId: 'smouha',
  inquiryType: 'viewing',
  message: 'ممكن نيجي نشوفه بكره العصر؟',
};

test('Egyptian mobile validation normalizes local, Arabic-Indic, and +20 formats and rejects invalid numbers', () => {
  assert.deepEqual(normalizeEgyptianMobile('01012345678'), {
    valid: true,
    local: '01012345678',
    e164: '+201012345678',
    digitsOnly: '201012345678',
  });

  // Arabic-Indic digits + spaces
  assert.equal(normalizeEgyptianMobile('٠١٢ ٣٤٥٦ ٧٨٩٠').e164, '+201234567890');
  // +20 prefix
  assert.equal(normalizeEgyptianMobile('+20 155 000 1122').local, '01550001122');

  // Invalid prefixes / lengths
  assert.equal(normalizeEgyptianMobile('01312345678').valid, false);
  assert.equal(normalizeEgyptianMobile('0223456789').valid, false);
  assert.equal(normalizeEgyptianMobile('0101234567').valid, false);
  assert.equal(normalizeEgyptianMobile('').valid, false);
});

test('inquiry form validation checks name, Egyptian phone, area, and 300-char limit', () => {
  assert.equal(validateDogInquiryForm(VALID_FORM).valid, true);

  const bad = validateDogInquiryForm({
    name: 'أ',
    phone: '12345',
    areaId: '',
    inquiryType: 'viewing',
    message: 'a'.repeat(301),
  });

  assert.equal(bad.valid, false);
  assert.equal(bad.errors.name, 'min_length');
  assert.equal(bad.errors.phone, 'invalid_phone');
  assert.equal(bad.errors.areaId, 'required');
  assert.equal(bad.errors.message, 'max_length');
});

test('strictly blocks WhatsApp URL creation for demo and sold dogs EVEN when a number is configured', () => {
  const configuredNumber = '201001234567';
  const demoDog = DEMO_DOGS[0];
  const soldDog: DogListing = { ...REAL_AVAILABLE_DOG, availability: 'sold' };

  // Demo dog: preview/copy allowed, WhatsApp link strictly blocked even with real number
  const demoState = getWhatsAppActionState(demoDog, configuredNumber);
  assert.equal(demoState.canPreviewAndCopy, true);
  assert.equal(demoState.canOpenWhatsApp, false);
  assert.equal(demoState.reason, 'blocked_demo');
  assert.equal(
    buildDogInquiryWhatsAppUrl({
      dog: demoDog,
      message: 'test',
      whatsappNumber: configuredNumber,
    }),
    null
  );

  // Sold dog: preview/copy allowed, WhatsApp link strictly blocked even with real number
  const soldState = getWhatsAppActionState(soldDog, configuredNumber);
  assert.equal(soldState.canPreviewAndCopy, true);
  assert.equal(soldState.canOpenWhatsApp, false);
  assert.equal(soldState.reason, 'blocked_sold');
  assert.equal(
    buildDogInquiryWhatsAppUrl({
      dog: soldDog,
      message: 'test',
      whatsappNumber: configuredNumber,
    }),
    null
  );

  // Real available dog with unconfigured or malformed shop number: blocked as not_configured
  const unconfiguredState = getWhatsAppActionState(REAL_AVAILABLE_DOG, '');
  assert.equal(unconfiguredState.canPreviewAndCopy, true);
  assert.equal(unconfiguredState.canOpenWhatsApp, false);
  assert.equal(unconfiguredState.reason, 'not_configured');
  assert.equal(
    buildDogInquiryWhatsAppUrl({
      dog: REAL_AVAILABLE_DOG,
      message: 'test',
      whatsappNumber: '',
    }),
    null
  );

  const invalidShopState = getWhatsAppActionState(REAL_AVAILABLE_DOG, '12345');
  assert.equal(invalidShopState.canOpenWhatsApp, false);
  assert.equal(invalidShopState.reason, 'not_configured');
  assert.equal(
    buildDogInquiryWhatsAppUrl({
      dog: REAL_AVAILABLE_DOG,
      message: 'test',
      whatsappNumber: '12345',
    }),
    null
  );

  // Real available dog WITH configured valid Egyptian number (local or 2010...): allowed and builds valid wa.me URL
  const allowedState = getWhatsAppActionState(REAL_AVAILABLE_DOG, configuredNumber);
  assert.equal(allowedState.canPreviewAndCopy, true);
  assert.equal(allowedState.canOpenWhatsApp, true);
  assert.equal(allowedState.reason, 'allowed');
  const url = buildDogInquiryWhatsAppUrl({
    dog: REAL_AVAILABLE_DOG,
    message: 'hello ALI PETS',
    whatsappNumber: configuredNumber,
  });
  assert.equal(url, 'https://wa.me/201001234567?text=hello%20ALI%20PETS');

  const localFormatUrl = buildDogInquiryWhatsAppUrl({
    dog: REAL_AVAILABLE_DOG,
    message: 'hi',
    whatsappNumber: '01001234567',
  });
  assert.equal(localFormatUrl, 'https://wa.me/201001234567?text=hi');
});

test('inquiry message preview clearly marks demo listings and omits missing price/notes without inventing facts', () => {
  const demoMsgAr = buildDogInquiryMessage({
    dog: DEMO_DOGS[0],
    form: { ...VALID_FORM, message: '' },
    lang: 'ar',
  });

  assert.match(demoMsgAr, /معاينة تجريبية/);
  assert.match(demoMsgAr, /AP-DEMO-01/);
  assert.match(demoMsgAr, /\+201012345678/);
  assert.doesNotMatch(demoMsgAr, /السعر المعروض/);
  assert.doesNotMatch(demoMsgAr, /ملاحظة:/);

  const realMsgEn = buildDogInquiryMessage({
    dog: REAL_AVAILABLE_DOG,
    form: VALID_FORM,
    lang: 'en',
    listingUrl: 'https://alipets.example/en/dogs/AP-REAL-101',
  });

  assert.doesNotMatch(realMsgEn, /DEMO PREVIEW/);
  assert.match(realMsgEn, /14,500 EGP/);
  assert.match(realMsgEn, /Smouha/);
  assert.match(realMsgEn, /AP-REAL-101/);

  // Unbacked 'verified' status on real dog must NOT appear as verified in message summary
  const unbackedDog: DogListing = {
    ...REAL_AVAILABLE_DOG,
    priceEgp: undefined,
    documentation: [{ key: 'vaccination', status: 'verified' }],
  };
  const unbackedMsg = buildDogInquiryMessage({
    dog: unbackedDog,
    form: VALID_FORM,
    lang: 'en',
  });
  assert.match(unbackedMsg, /Vaccination: No document/);
  assert.doesNotMatch(unbackedMsg, /Vaccination: Verified/);
});

test('includes selected Welcome Home accessories as price/availability questions and omits when empty', () => {
  const accList = [
    {
      id: 'acc-harness',
      name: { ar: 'صدرية مشي مبطنة ومريحة', en: 'Soft Padded Walk Harness' },
    },
    {
      id: 'acc-bowls',
      name: { ar: 'أطباق أكل ومياه بحامل خشبي', en: 'Ceramic Bowls on Oak Stand' },
    },
  ];

  const arWithAcc = buildDogInquiryMessage({
    dog: DEMO_DOGS[0],
    form: VALID_FORM,
    lang: 'ar',
    selectedAccessories: accList,
  });
  assert.match(arWithAcc, /إكسسوارات أرغب في معرفة أسعارها وتوافرها:/);
  assert.match(arWithAcc, /صدرية مشي مبطنة ومريحة/);
  assert.match(arWithAcc, /أطباق أكل ومياه بحامل خشبي/);
  assert.doesNotMatch(arWithAcc, /طلب شراء مؤكد/);

  const enWithAcc = buildDogInquiryMessage({
    dog: REAL_AVAILABLE_DOG,
    form: VALID_FORM,
    lang: 'en',
    selectedAccessories: accList,
  });
  assert.match(enWithAcc, /Accessories I would like to ask about pricing & availability for:/);
  assert.match(enWithAcc, /Soft Padded Walk Harness/);

  const arWithoutAcc = buildDogInquiryMessage({
    dog: DEMO_DOGS[0],
    form: VALID_FORM,
    lang: 'ar',
    selectedAccessories: [],
  });
  assert.doesNotMatch(arWithoutAcc, /إكسسوارات أرغب في معرفة أسعارها وتوافرها/);
});

