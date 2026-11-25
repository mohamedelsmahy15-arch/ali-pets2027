import type {
  DocStatus,
  DocumentationItem,
  DogAgeBucket,
  DogDocumentationBreakdown,
  DogFilterState,
  DogListing,
  DogSize,
  DogSortOption,
  DogVaccinationFilter,
  VaccinationAssessment,
} from '@/src/types';
import { getActiveListings } from './register';

export const DEFAULT_DOG_FILTER_STATE: DogFilterState = {
  q: '',
  breeds: [],
  ages: [],
  gender: 'all',
  sizes: [],
  includePriceOnInquiry: true,
  vaccinations: [],
  availability: [],
  sort: 'newest',
};

const VALID_AGES: ReadonlySet<DogAgeBucket> = new Set([
  'under-6',
  'under-3',
  '3-6',
  '6-12',
  'over-12',
]);

const VALID_SIZES: ReadonlySet<DogSize> = new Set([
  'small',
  'medium',
  'large',
  'giant',
]);

const VALID_VACCINATIONS: ReadonlySet<DogVaccinationFilter> = new Set([
  'verified',
  'partially_documented',
]);

const VALID_AVAILABILITY: ReadonlySet<'available' | 'reserved'> = new Set([
  'available',
  'reserved',
]);

const VALID_SORTS: ReadonlySet<DogSortOption> = new Set([
  'newest',
  'price-asc',
  'price-desc',
]);

function parseListParam<T extends string>(
  params: URLSearchParams,
  key: string,
  allowSet?: ReadonlySet<T>
): T[] {
  const rawValues = params.getAll(key);
  const out: T[] = [];
  const seen = new Set<string>();

  for (const raw of rawValues) {
    for (const part of raw.split(',')) {
      const clean = part.trim();
      if (!clean) continue;
      if (allowSet && !allowSet.has(clean as T)) continue;
      if (!seen.has(clean)) {
        seen.add(clean);
        out.push(clean as T);
      }
    }
  }
  return out;
}

function parseOptionalPrice(raw: string | null): number | undefined {
  if (raw === null || raw.trim() === '') return undefined;
  const num = Number(raw);
  if (!Number.isFinite(num) || num < 0) return undefined;
  return num;
}

export function parseDogFiltersFromSearch(search: string): DogFilterState {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);

  const q = params.get('q')?.trim() ?? '';
  const breeds = parseListParam<string>(params, 'breed');
  const ages = parseListParam<DogAgeBucket>(params, 'age', VALID_AGES);

  const rawGender = params.get('gender');
  const gender = rawGender === 'male' || rawGender === 'female' ? rawGender : 'all';

  const sizes = parseListParam<DogSize>(params, 'size', VALID_SIZES);

  let minPrice = parseOptionalPrice(params.get('minPrice'));
  let maxPrice = parseOptionalPrice(params.get('maxPrice'));
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  const rawPriceOnInquiry = params.get('priceOnInquiry');
  const includePriceOnInquiry =
    rawPriceOnInquiry !== '0' && rawPriceOnInquiry !== 'false';

  const vaccinations = parseListParam<DogVaccinationFilter>(
    params,
    'vaccination',
    VALID_VACCINATIONS
  );

  const availability = parseListParam<'available' | 'reserved'>(
    params,
    'availability',
    VALID_AVAILABILITY
  );

  const rawSort = params.get('sort') as DogSortOption | null;
  const sort: DogSortOption = rawSort && VALID_SORTS.has(rawSort) ? rawSort : 'newest';

  return {
    q,
    breeds,
    ages,
    gender,
    sizes,
    minPrice,
    maxPrice,
    includePriceOnInquiry,
    vaccinations,
    availability,
    sort,
  };
}

export function serializeDogFiltersToSearch(state: DogFilterState): string {
  const params = new URLSearchParams();

  const cleanQ = state.q.trim();
  if (cleanQ) params.set('q', cleanQ);
  if (state.breeds.length > 0) params.set('breed', state.breeds.join(','));
  if (state.ages.length > 0) params.set('age', state.ages.join(','));
  if (state.gender !== 'all') params.set('gender', state.gender);
  if (state.sizes.length > 0) params.set('size', state.sizes.join(','));

  if (state.minPrice !== undefined && Number.isFinite(state.minPrice) && state.minPrice >= 0) {
    params.set('minPrice', String(state.minPrice));
  }
  if (state.maxPrice !== undefined && Number.isFinite(state.maxPrice) && state.maxPrice >= 0) {
    params.set('maxPrice', String(state.maxPrice));
  }
  if (!state.includePriceOnInquiry) {
    params.set('priceOnInquiry', '0');
  }
  if (state.vaccinations.length > 0) {
    params.set('vaccination', state.vaccinations.join(','));
  }
  if (state.availability.length > 0) {
    params.set('availability', state.availability.join(','));
  }
  if (state.sort !== 'newest') {
    params.set('sort', state.sort);
  }

  const str = params.toString();
  return str ? `?${str}` : '';
}

/**
 * Resolves a dog's age in months cleanly without inventing data.
 * 1) Uses valid non-future `birthDate` if present.
 * 2) Otherwise uses explicit `ageMonths` (>= 0) if present.
 * 3) Returns `null` if neither is valid.
 */
export function resolveDogAgeMonths(
  dog: Pick<DogListing, 'birthDate' | 'ageMonths'>,
  referenceDate: Date = new Date()
): number | null {
  if (dog.birthDate && dog.birthDate.trim().length > 0) {
    const birthMs = Date.parse(dog.birthDate);
    const refMs = referenceDate.getTime();
    if (!Number.isNaN(birthMs) && !Number.isNaN(refMs) && birthMs <= refMs) {
      const birth = new Date(birthMs);
      let months =
        (referenceDate.getUTCFullYear() - birth.getUTCFullYear()) * 12 +
        (referenceDate.getUTCMonth() - birth.getUTCMonth());
      if (referenceDate.getUTCDate() < birth.getUTCDate()) {
        months -= 1;
      }
      return Math.max(0, months);
    }
  }

  if (
    typeof dog.ageMonths === 'number' &&
    Number.isFinite(dog.ageMonths) &&
    dog.ageMonths >= 0
  ) {
    return dog.ageMonths;
  }

  return null;
}

/**
 * Half-open intervals [min, max) avoid any overlap or gaps at boundaries (3, 6, 12 months).
 * `under-6` equals exact union of `under-3` and `3-6` for homepage "Puppies" tile compatibility.
 */
export function matchesAgeBucket(
  ageMonths: number | null,
  bucket: DogAgeBucket
): boolean {
  if (ageMonths === null || !Number.isFinite(ageMonths) || ageMonths < 0) {
    return false;
  }
  switch (bucket) {
    case 'under-6':
      return ageMonths < 6;
    case 'under-3':
      return ageMonths < 3;
    case '3-6':
      return ageMonths >= 3 && ageMonths < 6;
    case '6-12':
      return ageMonths >= 6 && ageMonths < 12;
    case 'over-12':
      return ageMonths >= 12;
  }
}

export function hasSupportingDocumentEvidence(item: DocumentationItem): boolean {
  const hasSource = Boolean(item.sourceName && item.sourceName.trim().length > 0);
  const hasValidDate = Boolean(
    item.documentDate &&
      item.documentDate.trim().length > 0 &&
      !Number.isNaN(Date.parse(item.documentDate))
  );
  const hasDocumentImage =
    Array.isArray(item.documentImages) &&
    item.documentImages.some((url) => typeof url === 'string' && url.trim().length > 0);

  return hasSource && hasValidDate && hasDocumentImage;
}

/**
 * Evaluates vaccination status strictly from the `vaccination` item and actual attached proof.
 * Never describes a dog as documented/vaccinated without backing evidence, and always tracks `isDemoSample`.
 */
export function assessDogVaccination(dog: DogListing): VaccinationAssessment {
  const item = dog.documentation.find(
    (doc) => doc.key === 'vaccination' && doc.applicable !== false
  );

  if (!item) {
    return {
      state: 'not_provided',
      hasSupportingDocument: false,
      hasDetails: false,
      isDemoSample: dog.isDemo,
    };
  }

  const hasSupportingDocument = hasSupportingDocumentEvidence(item);
  const hasDetails = Boolean(
    (item.details?.ar && item.details.ar.trim().length > 0) ||
      (item.details?.en && item.details.en.trim().length > 0)
  );

  let state: VaccinationAssessment['state'];
  if (item.status === 'verified') {
    // Unbacked 'verified' status must NOT pass as documented vaccination
    state = hasSupportingDocument ? 'verified_with_record' : 'not_documented';
  } else if (item.status === 'partially_documented') {
    state = hasDetails || hasSupportingDocument ? 'partial_record' : 'not_documented';
  } else if (item.status === 'not_documented') {
    state = 'not_documented';
  } else {
    state = 'not_provided';
  }

  return {
    state,
    hasSupportingDocument,
    hasDetails,
    isDemoSample: dog.isDemo,
  };
}

/**
 * True only for non-demo listings backed by a verified vaccination document.
 */
export function isRealVerifiedVaccination(dog: DogListing): boolean {
  if (dog.isDemo) return false;
  return assessDogVaccination(dog).state === 'verified_with_record';
}

export function matchesVaccinationFilter(
  dog: DogListing,
  selected: DogVaccinationFilter[]
): boolean {
  if (selected.length === 0) return true;
  const assessment = assessDogVaccination(dog);

  return selected.some((filter) => {
    if (filter === 'verified') {
      return assessment.state === 'verified_with_record';
    }
    if (filter === 'partially_documented') {
      return assessment.state === 'partial_record';
    }
    return false;
  });
}

/**
 * Reads the real listing timestamp (`createdAt`). Never falls back to `birthDate` or `Date.now()`.
 */
export function parseListingCreatedAtMs(
  dog: Pick<DogListing, 'createdAt'>
): number | null {
  if (!dog.createdAt || dog.createdAt.trim().length === 0) return null;
  const ms = Date.parse(dog.createdAt);
  return Number.isNaN(ms) ? null : ms;
}

export function getEffectiveDocStatus(item: DocumentationItem): DocStatus {
  if (item.status === 'verified' && !hasSupportingDocumentEvidence(item)) {
    return 'not_documented';
  }
  return item.status;
}

export function sortDogs(dogs: DogListing[], sort: DogSortOption): DogListing[] {
  const copy = [...dogs];

  copy.sort((a, b) => {
    if (sort === 'price-asc' || sort === 'price-desc') {
      const aHasPrice =
        typeof a.priceEgp === 'number' && Number.isFinite(a.priceEgp) && a.priceEgp >= 0;
      const bHasPrice =
        typeof b.priceEgp === 'number' && Number.isFinite(b.priceEgp) && b.priceEgp >= 0;

      // Dogs without confirmed prices always appear after priced dogs
      if (aHasPrice !== bHasPrice) {
        return aHasPrice ? -1 : 1;
      }
      if (aHasPrice && bHasPrice && a.priceEgp !== b.priceEgp) {
        return sort === 'price-asc'
          ? (a.priceEgp as number) - (b.priceEgp as number)
          : (b.priceEgp as number) - (a.priceEgp as number);
      }
    }

    // Primary sort for 'newest' (and tie-breaker for price sorts): valid createdAt descending
    const aCreated = parseListingCreatedAtMs(a);
    const bCreated = parseListingCreatedAtMs(b);

    if (aCreated !== null && bCreated !== null && aCreated !== bCreated) {
      return bCreated - aCreated;
    }
    if (aCreated !== null && bCreated === null) return -1;
    if (aCreated === null && bCreated !== null) return 1;

    return a.listingId.localeCompare(b.listingId);
  });

  return copy;
}

export function getAvailablePriceBounds(dogs: DogListing[]): {
  hasPricedDogs: boolean;
  min: number | null;
  max: number | null;
} {
  const active = getActiveListings(dogs);
  const prices = active
    .map((d) => d.priceEgp)
    .filter((p): p is number => typeof p === 'number' && Number.isFinite(p) && p >= 0);

  if (prices.length === 0) {
    return { hasPricedDogs: false, min: null, max: null };
  }

  return {
    hasPricedDogs: true,
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function deriveAvailableBreeds(dogs: DogListing[]): Array<{
  breedKey: string;
  breed: { ar: string; en: string };
  count: number;
}> {
  const active = getActiveListings(dogs);
  const map = new Map<
    string,
    { breedKey: string; breed: { ar: string; en: string }; count: number }
  >();

  for (const dog of active) {
    const existing = map.get(dog.breedKey);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(dog.breedKey, {
        breedKey: dog.breedKey,
        breed: dog.breed,
        count: 1,
      });
    }
  }

  return Array.from(map.values());
}

export function filterAndSortDogs(
  dogs: DogListing[],
  state: DogFilterState,
  options?: { referenceDate?: Date }
): DogListing[] {
  const referenceDate = options?.referenceDate ?? new Date();
  const qNorm = state.q.trim().toLowerCase();
  const hasPriceBounds =
    state.minPrice !== undefined || state.maxPrice !== undefined;

  const filtered = getActiveListings(dogs).filter((dog) => {
    if (qNorm) {
      const matchesQuery =
        dog.listingId.toLowerCase().includes(qNorm) ||
        dog.breed.ar.toLowerCase().includes(qNorm) ||
        dog.breed.en.toLowerCase().includes(qNorm) ||
        dog.title.ar.toLowerCase().includes(qNorm) ||
        dog.title.en.toLowerCase().includes(qNorm);
      if (!matchesQuery) return false;
    }

    if (state.breeds.length > 0 && !state.breeds.includes(dog.breedKey)) {
      return false;
    }

    if (state.ages.length > 0) {
      const ageMonths = resolveDogAgeMonths(dog, referenceDate);
      const anyAgeMatch = state.ages.some((bucket) =>
        matchesAgeBucket(ageMonths, bucket)
      );
      if (!anyAgeMatch) return false;
    }

    if (state.gender !== 'all' && dog.gender !== state.gender) {
      return false;
    }

    if (state.sizes.length > 0) {
      if (!dog.sizeCategory || !state.sizes.includes(dog.sizeCategory)) {
        return false;
      }
    }

    const hasConfirmedPrice =
      typeof dog.priceEgp === 'number' &&
      Number.isFinite(dog.priceEgp) &&
      dog.priceEgp >= 0;

    if (!hasConfirmedPrice) {
      if (!state.includePriceOnInquiry) return false;
    } else if (hasPriceBounds) {
      const price = dog.priceEgp as number;
      if (state.minPrice !== undefined && price < state.minPrice) return false;
      if (state.maxPrice !== undefined && price > state.maxPrice) return false;
    }

    if (!matchesVaccinationFilter(dog, state.vaccinations)) {
      return false;
    }

    if (
      state.availability.length > 0 &&
      (dog.availability === 'sold' || !state.availability.includes(dog.availability))
    ) {
      return false;
    }

    return true;
  });

  return sortDogs(filtered, state.sort);
}

export function countActiveFilterChips(state: DogFilterState): number {
  let count = 0;
  if (state.q.trim()) count += 1;
  count += state.breeds.length;
  count += state.ages.length;
  if (state.gender !== 'all') count += 1;
  count += state.sizes.length;
  if (state.minPrice !== undefined || state.maxPrice !== undefined) count += 1;
  if (!state.includePriceOnInquiry) count += 1;
  count += state.vaccinations.length;
  count += state.availability.length;
  return count;
}

export function getSimilarDogs(
  dogs: DogListing[],
  targetDog: DogListing,
  limit = 4
): DogListing[] {
  const candidates = getActiveListings(dogs).filter(
    (dog) =>
      dog.listingId !== targetDog.listingId &&
      (dog.breedKey === targetDog.breedKey ||
        (Boolean(targetDog.sizeCategory) && dog.sizeCategory === targetDog.sizeCategory))
  );

  const sorted = sortDogs(candidates, 'newest').sort((a, b) => {
    const aBreedMatch = a.breedKey === targetDog.breedKey ? 0 : 1;
    const bBreedMatch = b.breedKey === targetDog.breedKey ? 0 : 1;
    return aBreedMatch - bBreedMatch;
  });

  return sorted.slice(0, Math.max(0, limit));
}

export function findDogByListingId(
  dogs: DogListing[],
  listingId?: string
): DogListing | null {
  if (!listingId) return null;
  const clean = listingId.trim().toLowerCase();
  if (!clean) return null;
  return dogs.find((dog) => dog.listingId.trim().toLowerCase() === clean) ?? null;
}

/**
 * Counts applicable documentation items accurately without ever mixing
 * `partially_documented` or unbacked `verified` entries into `verifiedWithProofCount`.
 */
export function getDocumentationBreakdown(
  dog: Pick<DogListing, 'documentation'>
): DogDocumentationBreakdown {
  const applicable = dog.documentation.filter((item) => item.applicable !== false);
  let verifiedWithProofCount = 0;
  let partialCount = 0;
  let unrecordedCount = 0;

  for (const item of applicable) {
    const effectiveStatus = getEffectiveDocStatus(item);
    if (effectiveStatus === 'verified') {
      verifiedWithProofCount += 1;
    } else if (effectiveStatus === 'partially_documented') {
      partialCount += 1;
    } else {
      unrecordedCount += 1;
    }
  }

  return {
    totalApplicable: applicable.length,
    verifiedWithProofCount,
    partialCount,
    unrecordedCount,
  };
}

