import { BRAND_ASSETS } from '@/src/data/assets';
import type { CategoryTileData, DogListing } from '@/src/types';

/**
 * DEMO PREVIEW LISTINGS ONLY.
 * All entries carry isDemo: true and illustrative: true.
 * Real commercial inquiries are disabled for demo profiles until real shop inventory replaces them.
 */
export const DEMO_DOGS: DogListing[] = [
  {
    listingId: 'AP-DEMO-01',
    isDemo: true,
    illustrative: true,
    breedKey: 'golden-retriever',
    breed: { ar: 'جولدن ريتريفر', en: 'Golden Retriever' },
    title: {
      ar: 'نموذج معاينة — جولدن ريتريفر',
      en: 'Demo Preview — Golden Retriever',
    },
    ageMonths: 3,
    ageLabel: { ar: 'حوالي 3 شهور', en: 'Around 3 months' },
    gender: 'male',
    coatColor: { ar: 'ذهبي فاتح', en: 'Light Gold' },
    sizeCategory: 'large',
    expectedAdultSize: { ar: 'حجم كبير', en: 'Large size' },
    availability: 'available',
    personality: {
      ar: 'نموذج تجريبي بيوضّح شكل عرض بيانات الكلب وأوراقه — مش كلب حقيقي للبيع.',
      en: 'Sample demo profile showing how a dog listing and its records appear — not for sale.',
    },
    documentation: [
      {
        key: 'vaccination',
        status: 'verified',
        details: {
          ar: 'بند تجريبي — متسجّل بمستند معاينة',
          en: 'Demo entry — backed by sample record',
        },
        sourceName: 'Demo Veterinary Record',
        documentDate: '2026-11-10',
        documentImages: [BRAND_ASSETS.demoDogs.golden],
      },
      {
        key: 'deworming',
        status: 'partially_documented',
        details: {
          ar: 'بند تجريبي — متسجل جزئياً',
          en: 'Demo entry — partially noted',
        },
      },
      {
        key: 'health_booklet',
        status: 'not_documented',
      },
      {
        key: 'pedigree',
        status: 'not_provided',
        applicable: false,
      },
    ],
    media: [
      {
        url: BRAND_ASSETS.demoDogs.golden,
        type: 'image',
        illustrative: true,
        dominantColor: '#DCD0BE',
        alt: {
          ar: 'صورة توضيحية تجريبية لجرو جولدن ريتريفر — مش كلب متاح للبيع',
          en: 'Illustrative demo image of a Golden Retriever puppy — not a dog for sale',
        },
      },
    ],
    createdAt: '2026-11-24T10:00:00Z',
  },
  {
    listingId: 'AP-DEMO-02',
    isDemo: true,
    illustrative: true,
    breedKey: 'french-bulldog',
    breed: { ar: 'فرنش بولدوج', en: 'French Bulldog' },
    title: {
      ar: 'نموذج معاينة — فرنش بولدوج',
      en: 'Demo Preview — French Bulldog',
    },
    ageMonths: 4,
    ageLabel: { ar: 'حوالي 4 شهور', en: 'Around 4 months' },
    gender: 'female',
    coatColor: { ar: 'كريمي فاتح', en: 'Cream Fawn' },
    sizeCategory: 'small',
    expectedAdultSize: { ar: 'حجم صغير', en: 'Small size' },
    availability: 'available',
    personality: {
      ar: 'نموذج تجريبي بيوضّح شكل عرض الكلاب الصغيرة في الموقع.',
      en: 'Sample demo listing showing how small-breed listings display on the site.',
    },
    documentation: [
      {
        key: 'vaccination',
        status: 'partially_documented',
        details: {
          ar: 'بند تجريبي — توثيق جزئي',
          en: 'Demo entry — partial record only',
        },
      },
      {
        key: 'deworming',
        status: 'not_documented',
      },
      {
        key: 'health_booklet',
        status: 'not_provided',
      },
      {
        key: 'pedigree',
        status: 'not_provided',
        applicable: false,
      },
    ],
    media: [
      {
        url: BRAND_ASSETS.demoDogs.frenchie,
        type: 'image',
        illustrative: true,
        dominantColor: '#D6C9B6',
        alt: {
          ar: 'صورة توضيحية تجريبية لفرنش بولدوج — مش كلب متاح للبيع',
          en: 'Illustrative demo image of a French Bulldog — not a dog for sale',
        },
      },
    ],
    createdAt: '2026-11-23T10:00:00Z',
  },
  {
    listingId: 'AP-DEMO-03',
    isDemo: true,
    illustrative: true,
    breedKey: 'german-shepherd',
    breed: { ar: 'جيرمان شيبرد', en: 'German Shepherd' },
    title: {
      ar: 'نموذج معاينة — جيرمان شيبرد',
      en: 'Demo Preview — German Shepherd',
    },
    ageMonths: 5,
    ageLabel: { ar: 'حوالي 5 شهور', en: 'Around 5 months' },
    gender: 'male',
    coatColor: { ar: 'أسود في بني', en: 'Black & Tan' },
    sizeCategory: 'large',
    expectedAdultSize: { ar: 'حجم كبير', en: 'Large size' },
    availability: 'reserved',
    personality: {
      ar: 'نموذج تجريبي بيوضّح شكل الكلب لما حالته تكون «محجوز».',
      en: 'Sample demo listing showing how the Reserved badge appears on cards.',
    },
    documentation: [
      {
        key: 'vaccination',
        status: 'verified',
        details: {
          ar: 'بند تجريبي — متسجّل بمستند معاينة',
          en: 'Demo entry — backed by sample record',
        },
        sourceName: 'Demo Veterinary Record',
        documentDate: '2026-11-05',
        documentImages: [BRAND_ASSETS.demoDogs.shepherd],
      },
      {
        key: 'deworming',
        status: 'verified',
        details: {
          ar: 'بند تجريبي — متسجّل بمستند معاينة',
          en: 'Demo entry — backed by sample record',
        },
        sourceName: 'Demo Veterinary Record',
        documentDate: '2026-11-05',
        documentImages: [BRAND_ASSETS.demoDogs.shepherd],
      },
      {
        key: 'health_booklet',
        status: 'not_documented',
      },
      {
        key: 'pedigree',
        status: 'not_provided',
        applicable: false,
      },
    ],
    media: [
      {
        url: BRAND_ASSETS.demoDogs.shepherd,
        type: 'image',
        illustrative: true,
        dominantColor: '#C5B49D',
        alt: {
          ar: 'صورة توضيحية تجريبية لجيرمان شيبرد — مش كلب متاح للبيع',
          en: 'Illustrative demo image of a German Shepherd — not a dog for sale',
        },
      },
    ],
    createdAt: '2026-11-22T10:00:00Z',
  },
  {
    listingId: 'AP-DEMO-04',
    isDemo: true,
    illustrative: true,
    breedKey: 'pomeranian',
    breed: { ar: 'بوميرانيان', en: 'Pomeranian' },
    title: {
      ar: 'نموذج معاينة — بوميرانيان',
      en: 'Demo Preview — Pomeranian',
    },
    ageMonths: 7,
    ageLabel: { ar: 'حوالي 7 شهور', en: 'Around 7 months' },
    gender: 'female',
    coatColor: { ar: 'بيج فاتح', en: 'Cream Orange' },
    sizeCategory: 'small',
    expectedAdultSize: { ar: 'حجم صغير', en: 'Small size' },
    availability: 'available',
    personality: {
      ar: 'نموذج تجريبي للكلاب الصغيرة المناسبة للشقق.',
      en: 'Sample demo listing representing small companion dogs suited for apartments.',
    },
    documentation: [
      {
        key: 'vaccination',
        status: 'not_documented',
      },
      {
        key: 'deworming',
        status: 'not_provided',
      },
      {
        key: 'health_booklet',
        status: 'not_provided',
      },
      {
        key: 'pedigree',
        status: 'not_provided',
        applicable: false,
      },
    ],
    media: [
      {
        url: BRAND_ASSETS.demoDogs.pomeranian,
        type: 'image',
        illustrative: true,
        dominantColor: '#DFD2BF',
        alt: {
          ar: 'صورة توضيحية تجريبية لبوميرانيان — مش كلب متاح للبيع',
          en: 'Illustrative demo image of a Pomeranian — not a dog for sale',
        },
      },
    ],
    createdAt: '2026-11-21T10:00:00Z',
  },
  {
    listingId: 'AP-DEMO-05',
    isDemo: true,
    illustrative: true,
    breedKey: 'beagle',
    breed: { ar: 'بيجل', en: 'Beagle' },
    title: {
      ar: 'نموذج معاينة — بيجل',
      en: 'Demo Preview — Beagle',
    },
    ageMonths: 4,
    ageLabel: { ar: 'حوالي 4 شهور', en: 'Around 4 months' },
    gender: 'male',
    coatColor: { ar: 'ثلاثي الألوان', en: 'Tricolor' },
    sizeCategory: 'medium',
    expectedAdultSize: { ar: 'حجم متوسط', en: 'Medium size' },
    availability: 'available',
    personality: {
      ar: 'نموذج تجريبي للكلاب المتوسطة في الحجم.',
      en: 'Sample demo listing representing medium-sized dogs.',
    },
    documentation: [
      {
        key: 'vaccination',
        status: 'verified',
        details: {
          ar: 'بند تجريبي — متسجّل بمستند معاينة',
          en: 'Demo entry — backed by sample record',
        },
        sourceName: 'Demo Veterinary Record',
        documentDate: '2026-11-12',
        documentImages: [BRAND_ASSETS.demoDogs.beagle],
      },
      {
        key: 'deworming',
        status: 'not_documented',
      },
      {
        key: 'health_booklet',
        status: 'partially_documented',
        details: {
          ar: 'بند تجريبي — صفحات أولية بس',
          en: 'Demo entry — initial pages only',
        },
      },
      {
        key: 'pedigree',
        status: 'not_provided',
        applicable: false,
      },
    ],
    media: [
      {
        url: BRAND_ASSETS.demoDogs.beagle,
        type: 'image',
        illustrative: true,
        dominantColor: '#CBBCA6',
        alt: {
          ar: 'صورة توضيحية تجريبية لبيجل — مش كلب متاح للبيع',
          en: 'Illustrative demo image of a Beagle — not a dog for sale',
        },
      },
    ],
    createdAt: '2026-11-20T10:00:00Z',
  },
];

export const CATEGORY_TILES: CategoryTileData[] = [
  {
    id: 'puppies',
    filterQuery: '?age=under-6',
    label: { ar: 'جراوي', en: 'Puppies' },
    image: BRAND_ASSETS.categories.puppies.url,
    dominantColor: BRAND_ASSETS.categories.puppies.dominantColor,
    illustrative: true,
    alt: BRAND_ASSETS.categories.puppies.alt,
  },
  {
    id: 'small',
    filterQuery: '?size=small',
    label: { ar: 'كلاب صغيرة', en: 'Small Dogs' },
    image: BRAND_ASSETS.categories.small.url,
    dominantColor: BRAND_ASSETS.categories.small.dominantColor,
    illustrative: true,
    alt: BRAND_ASSETS.categories.small.alt,
  },
  {
    id: 'medium',
    filterQuery: '?size=medium',
    label: { ar: 'كلاب متوسطة', en: 'Medium Dogs' },
    image: BRAND_ASSETS.categories.medium.url,
    dominantColor: BRAND_ASSETS.categories.medium.dominantColor,
    illustrative: true,
    alt: BRAND_ASSETS.categories.medium.alt,
  },
  {
    id: 'large',
    filterQuery: '?size=large',
    label: { ar: 'كلاب كبيرة', en: 'Large Dogs' },
    image: BRAND_ASSETS.categories.large.url,
    dominantColor: BRAND_ASSETS.categories.large.dominantColor,
    illustrative: true,
    alt: BRAND_ASSETS.categories.large.alt,
  },
];
