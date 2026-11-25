export type Language = 'ar' | 'en';

export type DogAvailability = 'available' | 'reserved' | 'sold';

export type DogSize = 'small' | 'medium' | 'large' | 'giant';

export type DogGender = 'male' | 'female';

export type DocStatus =
  | 'verified'
  | 'partially_documented'
  | 'not_documented'
  | 'not_provided';

export interface DocumentationItem {
  key: 'vaccination' | 'deworming' | 'health_booklet' | 'pedigree';
  status: DocStatus;
  details?: {
    ar: string;
    en: string;
  };
  sourceName?: string;
  documentDate?: string;
  documentImages?: string[];
  applicable?: boolean;
}

export interface DogMedia {
  url: string;
  type: 'image' | 'video';
  illustrative: boolean;
  dominantColor: string;
  alt: {
    ar: string;
    en: string;
  };
}

export interface DogListing {
  listingId: string;
  isDemo: boolean;
  illustrative: boolean;
  breedKey: string;
  breed: {
    ar: string;
    en: string;
  };
  title: {
    ar: string;
    en: string;
  };
  ageMonths: number;
  ageLabel: {
    ar: string;
    en: string;
  };
  birthDate?: string;
  gender: DogGender;
  coatColor: {
    ar: string;
    en: string;
  };
  sizeCategory?: DogSize;
  expectedAdultSize?: {
    ar: string;
    en: string;
  };
  /** Price in EGP when explicitly confirmed by business owner; omitted if unconfirmed */
  priceEgp?: number;
  availability: DogAvailability;
  personality?: {
    ar: string;
    en: string;
  };
  documentation: DocumentationItem[];
  media: DogMedia[];
  createdAt: string;
  /** Admin-only private fields kept strictly excluded from public serializers */
  _private?: {
    supplierNote?: string;
    purchaseCost?: number;
  };
}

export interface BreedGuide {
  id: string;
  breedKey: string;
  name: {
    ar: string;
    en: string;
  };
  temperament: {
    ar: string;
    en: string;
  };
  image: string;
  dominantColor: string;
  illustrative: true;
  alt: {
    ar: string;
    en: string;
  };
}

export interface CategoryTileData {
  id: 'puppies' | 'small' | 'medium' | 'large';
  filterQuery: string;
  label: {
    ar: string;
    en: string;
  };
  image: string;
  dominantColor: string;
  illustrative: true;
  alt: {
    ar: string;
    en: string;
  };
}

export interface AccessoryPreviewItem {
  id: string;
  isDemo: boolean;
  illustrative: true;
  categoryKey: string;
  name: {
    ar: string;
    en: string;
  };
  categoryLabel: {
    ar: string;
    en: string;
  };
  imageUrl: string;
  dominantColor: string;
  alt: {
    ar: string;
    en: string;
  };
  iconKind: 'collar' | 'leash' | 'bowl' | 'bed' | 'harness' | 'toy' | 'brush';
}

export interface SiteConfig {
  brandName: string;
  city: {
    ar: string;
    en: string;
  };
  /** Must remain empty until the business owner supplies a real WhatsApp number */
  whatsappNumber: string;
  /** Must remain empty until the business owner supplies a verified shop address */
  shopAddress: {
    ar: string;
    en: string;
  };
  /** Must remain empty until the business owner confirms hours */
  openingHours: {
    ar: string;
    en: string;
  };
  isDemoPreview: boolean;
  alexandriaAreas: ReadonlyArray<{
    id: string;
    ar: string;
    en: string;
  }>;
}

export type DogAgeBucket = 'under-6' | 'under-3' | '3-6' | '6-12' | 'over-12';

export type DogGenderFilter = 'all' | DogGender;

export type DogVaccinationFilter = 'verified' | 'partially_documented';

export type DogSortOption = 'newest' | 'price-asc' | 'price-desc';

export interface DogFilterState {
  q: string;
  breeds: string[];
  ages: DogAgeBucket[];
  gender: DogGenderFilter;
  sizes: DogSize[];
  minPrice?: number;
  maxPrice?: number;
  includePriceOnInquiry: boolean;
  vaccinations: DogVaccinationFilter[];
  availability: Array<'available' | 'reserved'>;
  sort: DogSortOption;
}

export type VaccinationEvidenceState =
  | 'verified_with_record'
  | 'partial_record'
  | 'not_documented'
  | 'not_provided';

export interface VaccinationAssessment {
  state: VaccinationEvidenceState;
  hasSupportingDocument: boolean;
  hasDetails: boolean;
  isDemoSample: boolean;
}

export type InquiryType = 'more_info' | 'viewing' | 'price' | 'delivery';

export interface DogInquiryFormValues {
  name: string;
  phone: string;
  areaId: string;
  inquiryType: InquiryType;
  message: string;
}

export type WhatsAppActionReason =
  | 'allowed'
  | 'blocked_demo'
  | 'blocked_sold'
  | 'not_configured';

export interface WhatsAppActionState {
  canOpenWhatsApp: boolean;
  canPreviewAndCopy: boolean;
  reason: WhatsAppActionReason;
}

export interface DogDocumentationBreakdown {
  totalApplicable: number;
  verifiedWithProofCount: number;
  partialCount: number;
  unrecordedCount: number;
}

export type WelcomeHomeBasis =
  | 'age_and_size'
  | 'age_only'
  | 'size_only'
  | 'general_starter';

export interface WelcomeHomeRecommendation {
  item: AccessoryPreviewItem;
  basis: WelcomeHomeBasis;
  reason: {
    ar: string;
    en: string;
  };
}

export interface WelcomeHomeResult {
  isPersonalized: boolean;
  basisSummary: WelcomeHomeBasis;
  recommendations: WelcomeHomeRecommendation[];
}

export interface DogInquiryAccessoryRef {
  id: string;
  name: {
    ar: string;
    en: string;
  };
}
