import { BRAND_ASSETS } from '@/src/data/assets';
import type { AccessoryPreviewItem } from '@/src/types';

/**
 * Phase 2E illustrative demo accessories (no confirmed prices, ratings, or live inventory until Phase 3).
 */
export const ACCESSORIES_PREVIEW: AccessoryPreviewItem[] = [
  {
    id: 'acc-harness',
    isDemo: true,
    illustrative: true,
    categoryKey: 'collars',
    name: {
      ar: 'صدرية مشي مبطنة ومريحة',
      en: 'Soft Padded Walk Harness',
    },
    categoryLabel: {
      ar: 'صدريات وأطواق',
      en: 'Harnesses & Collars',
    },
    imageUrl: BRAND_ASSETS.accessories.harness.url,
    dominantColor: BRAND_ASSETS.accessories.harness.dominantColor,
    alt: BRAND_ASSETS.accessories.harness.alt,
    iconKind: 'harness',
  },
  {
    id: 'acc-leash',
    isDemo: true,
    illustrative: true,
    categoryKey: 'leashes',
    name: {
      ar: 'سير مشي قطن مجدول متين',
      en: 'Woven Cotton Rope Leash',
    },
    categoryLabel: {
      ar: 'سيور تمشية',
      en: 'Leashes',
    },
    imageUrl: BRAND_ASSETS.accessories.leash.url,
    dominantColor: BRAND_ASSETS.accessories.leash.dominantColor,
    alt: BRAND_ASSETS.accessories.leash.alt,
    iconKind: 'leash',
  },
  {
    id: 'acc-bowls',
    isDemo: true,
    illustrative: true,
    categoryKey: 'bowls',
    name: {
      ar: 'أطباق أكل ومياه بحامل خشبي',
      en: 'Ceramic Bowls on Oak Stand',
    },
    categoryLabel: {
      ar: 'أطباق أكل ومياه',
      en: 'Food & Water Bowls',
    },
    imageUrl: BRAND_ASSETS.accessories.bowls.url,
    dominantColor: BRAND_ASSETS.accessories.bowls.dominantColor,
    alt: BRAND_ASSETS.accessories.bowls.alt,
    iconKind: 'bowl',
  },
  {
    id: 'acc-bed',
    isDemo: true,
    illustrative: true,
    categoryKey: 'beds',
    name: {
      ar: 'سرير كتان مبطن بحواف مريحة',
      en: 'Linen Bolster Dog Bed',
    },
    categoryLabel: {
      ar: 'سراير وفرش',
      en: 'Beds',
    },
    imageUrl: BRAND_ASSETS.accessories.bed.url,
    dominantColor: BRAND_ASSETS.accessories.bed.dominantColor,
    alt: BRAND_ASSETS.accessories.bed.alt,
    iconKind: 'bed',
  },
  {
    id: 'acc-toy',
    isDemo: true,
    illustrative: true,
    categoryKey: 'toys',
    name: {
      ar: 'لعبة حبل قطن ناعمة للجراوي',
      en: 'Cotton Rope & Plush Puppy Toy',
    },
    categoryLabel: {
      ar: 'ألعاب جراوي',
      en: 'Toys',
    },
    imageUrl: BRAND_ASSETS.accessories.toy.url,
    dominantColor: BRAND_ASSETS.accessories.toy.dominantColor,
    alt: BRAND_ASSETS.accessories.toy.alt,
    iconKind: 'toy',
  },
  {
    id: 'acc-brush',
    isDemo: true,
    illustrative: true,
    categoryKey: 'grooming',
    name: {
      ar: 'فرشاة تمشيط خشبية مزدوجة',
      en: 'Wooden Double-Sided Brush',
    },
    categoryLabel: {
      ar: 'العناية والتنظيف',
      en: 'Grooming',
    },
    imageUrl: BRAND_ASSETS.accessories.brush.url,
    dominantColor: BRAND_ASSETS.accessories.brush.dominantColor,
    alt: BRAND_ASSETS.accessories.brush.alt,
    iconKind: 'brush',
  },
];
