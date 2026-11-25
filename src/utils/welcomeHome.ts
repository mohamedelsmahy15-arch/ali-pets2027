import { ACCESSORIES_PREVIEW } from '@/src/data/accessoriesPreview';
import type {
  AccessoryPreviewItem,
  DogListing,
  DogSize,
  WelcomeHomeBasis,
  WelcomeHomeRecommendation,
  WelcomeHomeResult,
} from '@/src/types';
import { resolveDogAgeMonths } from './dogFilter';

const SIZE_PHRASE: Record<DogSize, { ar: string; en: string }> = {
  small: { ar: 'للكلاب الصغيرة', en: 'small-sized dogs' },
  medium: { ar: 'للكلاب المتوسطة', en: 'medium-sized dogs' },
  large: { ar: 'للكلاب الكبيرة', en: 'large-sized dogs' },
  giant: { ar: 'للكلاب العملاقة', en: 'giant-sized dogs' },
};

function findAccessory(
  catalog: AccessoryPreviewItem[],
  id: string
): AccessoryPreviewItem | undefined {
  return catalog.find((item) => item.id === id);
}

/**
 * Returns up to 3 honest, non-pressuring accessory suggestions for welcoming a dog home.
 * - Strictly uses recorded age (birthDate/ageMonths) and recorded sizeCategory.
 * - Never invents missing facts or makes medical claims.
 * - When age AND size are missing, falls back to clearly labeled general starter suggestions.
 */
export function getWelcomeHomeRecommendations(
  dog: Pick<DogListing, 'ageMonths' | 'birthDate' | 'sizeCategory'>,
  catalog: AccessoryPreviewItem[] = ACCESSORIES_PREVIEW,
  referenceDate: Date = new Date()
): WelcomeHomeResult {
  const ageMonths = resolveDogAgeMonths(dog, referenceDate);
  const size = dog.sizeCategory;

  const hasAge = ageMonths !== null;
  const hasSize = Boolean(size);

  let basisSummary: WelcomeHomeBasis = 'general_starter';
  if (hasAge && hasSize) basisSummary = 'age_and_size';
  else if (hasAge) basisSummary = 'age_only';
  else if (hasSize) basisSummary = 'size_only';

  const recs: WelcomeHomeRecommendation[] = [];
  const pushRec = (
    id: string,
    basis: WelcomeHomeBasis,
    reason: { ar: string; en: string }
  ) => {
    if (recs.length >= 3) return;
    const item = findAccessory(catalog, id);
    if (!item || recs.some((r) => r.item.id === id)) return;
    recs.push({ item, basis, reason });
  };

  if (!hasAge && !hasSize) {
    pushRec('acc-bowls', 'general_starter', {
      ar: 'اقتراح تجهيز عام لأي كلب جديد لتنظيم الأكل والمياه من أول يوم (بيانات العمر والحجم غير مسجلة).',
      en: 'General first-day starter suggestion for organized feeding and water (age and size are not recorded yet).',
    });
    pushRec('acc-bed', 'general_starter', {
      ar: 'اقتراح تجهيز عام يوفّر مكان نوم هادئ ومحدد داخل البيت عند الاستقبال.',
      en: 'General starter suggestion to give your new companion a calm, dedicated resting spot at home.',
    });
    pushRec('acc-leash', 'general_starter', {
      ar: 'اقتراح تجهيز عام لخروجات التعوّد الأولى والتمشية الآمنة في البداية.',
      en: 'General starter suggestion for calm early outdoor walks and settling in.',
    });

    return {
      isPersonalized: false,
      basisSummary: 'general_starter',
      recommendations: recs,
    };
  }

  if (hasAge && ageMonths < 6) {
    // Young puppy (< 6 months)
    const sizeTextAr = size ? `ومقاس مناسب ${SIZE_PHRASE[size].ar}` : 'بمقاس ابتدائي لطيف';
    const sizeTextEn = size
      ? `sized appropriately for ${SIZE_PHRASE[size].en}`
      : 'in a gentle starter fit';

    pushRec('acc-harness', basisSummary, {
      ar: `أريح للجراوي تحت 6 شهور أثناء التعود على المشي بدون ضغط على الرقبة، ${sizeTextAr}.`,
      en: `Gentle around a puppy's neck while learning to walk under 6 months, ${sizeTextEn}.`,
    });

    pushRec('acc-toy', basisSummary, {
      ar: 'مناسبة للّعب الخفيف وإشغال الجرو الصغير في البيت في أول أسابيع الاستقبال.',
      en: 'Helpful for gentle indoor play and keeping a young puppy engaged during the first weeks home.',
    });

    if (size === 'large' || size === 'giant') {
      pushRec('acc-bowls', basisSummary, {
        ar: `أطباق ثابتة على حامل مريح ${SIZE_PHRASE[size].ar} لتنظيم الأكل والمياه من البداية.`,
        en: `Sturdy raised bowls suited for ${SIZE_PHRASE[size].en} to keep daily meals tidy from day one.`,
      });
    } else {
      pushRec('acc-bed', basisSummary, {
        ar: size
          ? `مكان نوم دافئ وهادئ مقاسه مناسب ${SIZE_PHRASE[size].ar} في فترة التعود الأولى.`
          : 'مكان نوم دافئ وهادئ يساعد الجرو يتعوّد على ركنه الخاص في البيت.',
        en: size
          ? `Cozy resting spot proportioned for ${SIZE_PHRASE[size].en} while settling into a new home.`
          : 'Cozy resting spot to help a young puppy settle into its own corner at home.',
      });
    }
  } else if (hasAge && ageMonths >= 6) {
    // Older puppy / young adult (6+ months)
    const sizeTextAr = size ? SIZE_PHRASE[size].ar : 'للكلاب فوق 6 شهور';
    const sizeTextEn = size ? SIZE_PHRASE[size].en : 'dogs 6 months and older';

    pushRec('acc-leash', basisSummary, {
      ar: `سير مشي متين مناسب للخروج والتمشية اليومية ${sizeTextAr}.`,
      en: `Durable everyday walking leash suited for ${sizeTextEn}.`,
    });

    pushRec('acc-bed', basisSummary, {
      ar: size
        ? `سرير مريح بمساحة كافية ${SIZE_PHRASE[size].ar} للراحة بعد اللعب والمشي.`
        : 'سرير مريح يوفّر مساحة نوم ثابتة ومستقلة في البيت.',
      en: size
        ? `Supportive bed sized for ${SIZE_PHRASE[size].en} to rest comfortably after walks.`
        : 'Supportive bed providing a dedicated resting spot at home.',
    });

    pushRec('acc-brush', basisSummary, {
      ar: 'مفيدة للتمشيط الروتيني والعناية اليومية بنظافة الفراء في البيت.',
      en: 'Practical for routine coat brushing and everyday at-home grooming.',
    });
  } else if (size) {
    // Size recorded only (age missing)
    pushRec('acc-harness', 'size_only', {
      ar: `مقترحة بناءً على الحجم المسجّل (${SIZE_PHRASE[size].ar}) للتمشية المريحة — العمر غير مسجل في الملف.`,
      en: `Suggested based on recorded size (${SIZE_PHRASE[size].en}) for comfortable walks — age is not recorded.`,
    });
    pushRec('acc-bed', 'size_only', {
      ar: `مساحة نوم مريحة مناسبة ${SIZE_PHRASE[size].ar} في البيت.`,
      en: `Comfortable sleeping space proportioned for ${SIZE_PHRASE[size].en}.`,
    });
    pushRec('acc-bowls', 'size_only', {
      ar: `أطباق أكل ومياه ثابتة مناسبة ${SIZE_PHRASE[size].ar}.`,
      en: `Steady food and water bowls suited for ${SIZE_PHRASE[size].en}.`,
    });
  }

  return {
    isPersonalized: true,
    basisSummary,
    recommendations: recs,
  };
}
