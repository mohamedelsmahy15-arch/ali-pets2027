import type { SiteConfig } from '@/src/types';

export const SITE_CONFIG: SiteConfig = {
  brandName: 'ALI PETS',
  city: {
    ar: 'الإسكندرية، مصر',
    en: 'Alexandria, Egypt',
  },
  // Intentionally empty: never invent a phone number. Configure real E.164 digits without '+' (e.g. '2010XXXXXXXX').
  whatsappNumber: '',
  // Intentionally empty until confirmed by business owner.
  shopAddress: {
    ar: '',
    en: '',
  },
  openingHours: {
    ar: '',
    en: '',
  },
  isDemoPreview: true,
  alexandriaAreas: [
    { id: 'smouha', ar: 'سموحة', en: 'Smouha' },
    { id: 'sidi-gaber', ar: 'سيدي جابر', en: 'Sidi Gaber' },
    { id: 'san-stefano', ar: 'سان ستيفانو', en: 'San Stefano' },
    { id: 'stanley', ar: 'ستانلي', en: 'Stanley' },
    { id: 'montaza', ar: 'المنتزه', en: 'Montaza' },
    { id: 'agami', ar: 'العجمي', en: 'Agami' },
    { id: 'asafra', ar: 'العصافرة', en: 'Asafra' },
    { id: 'fleming', ar: 'فلمنج', en: 'Fleming' },
    { id: 'moharam-bek', ar: 'محرم بك', en: 'Moharam Bek' },
    { id: 'ibrahimiya', ar: 'الإبراهيمية', en: 'Ibrahimiya' },
    { id: 'kafr-abdo', ar: 'كفر عبده', en: 'Kafr Abdo' },
    { id: 'laurent', ar: 'لوران', en: 'Laurent' },
    { id: 'gleem', ar: 'جليم', en: 'Gleem' },
    { id: 'shatby', ar: 'الشاطبي', en: 'Shatby' },
    { id: 'bahary', ar: 'بحري', en: 'Bahary' },
    { id: 'attarin', ar: 'العطارين', en: 'Attarin' },
    { id: 'borg-el-arab', ar: 'برج العرب', en: 'Borg El Arab' },
    { id: 'other', ar: 'أخرى', en: 'Other' },
  ],
};

export function isWhatsAppConfigured(): boolean {
  return SITE_CONFIG.whatsappNumber.trim().length > 0;
}

export function buildWhatsAppUrl(message: string): string | null {
  const digits = SITE_CONFIG.whatsappNumber.replace(/[^\d]/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
