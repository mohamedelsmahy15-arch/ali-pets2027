import { BRAND_ASSETS } from '@/src/data/assets';
import type { BreedGuide } from '@/src/types';

/**
 * General breed info only (does not imply live availability; owner confirms final 4 breeds).
 */
export const FEATURED_BREEDS: BreedGuide[] = [
  {
    id: 'breed-golden',
    breedKey: 'golden-retriever',
    name: { ar: 'جولدن ريتريفر', en: 'Golden Retriever' },
    temperament: {
      ar: 'طيب وهادي مع العيلة والأطفال، وسهل يتعلّم بالتدريب البسيط.',
      en: 'Friendly with families and responsive to calm, consistent training.',
    },
    image: BRAND_ASSETS.breeds.golden,
    dominantColor: '#D4C5AE',
    illustrative: true,
    alt: {
      ar: 'صورة توضيحية لسلالة جولدن ريتريفر',
      en: 'Illustrative portrait of an adult Golden Retriever',
    },
  },
  {
    id: 'breed-frenchie',
    breedKey: 'french-bulldog',
    name: { ar: 'فرنش بولدوج', en: 'French Bulldog' },
    temperament: {
      ar: 'مناسب للشقق، هادي نسبياً ومش محتاج مساحات كبيرة للحركة.',
      en: 'Well suited to apartment living with moderate daily exercise needs.',
    },
    image: BRAND_ASSETS.breeds.frenchie,
    dominantColor: '#D2C2AC',
    illustrative: true,
    alt: {
      ar: 'صورة توضيحية لسلالة فرنش بولدوج',
      en: 'Illustrative portrait of an adult French Bulldog',
    },
  },
  {
    id: 'breed-shepherd',
    breedKey: 'german-shepherd',
    name: { ar: 'جيرمان شيبرد', en: 'German Shepherd' },
    temperament: {
      ar: 'ذكي ومنتبه، وبيحتاج تمشية ونشاط يومي وتدريب من بدري.',
      en: 'Alert and active; needs daily exercise and early socialization.',
    },
    image: BRAND_ASSETS.breeds.shepherd,
    dominantColor: '#C9B9A3',
    illustrative: true,
    alt: {
      ar: 'صورة توضيحية لسلالة جيرمان شيبرد',
      en: 'Illustrative portrait of an adult German Shepherd',
    },
  },
  {
    id: 'breed-spaniel',
    breedKey: 'cocker-spaniel',
    name: { ar: 'كوكر سبانيل', en: 'Cocker Spaniel' },
    temperament: {
      ar: 'لطيف وحجمه متوسط، وبيحب وجود الناس والروتين الهادي في البيت.',
      en: 'Gentle, medium-sized companion that settles nicely into home routines.',
    },
    image: BRAND_ASSETS.breeds.spaniel,
    dominantColor: '#D3C3AC',
    illustrative: true,
    alt: {
      ar: 'صورة توضيحية لسلالة كوكر سبانيل',
      en: 'Illustrative portrait of an adult Cocker Spaniel',
    },
  },
];
