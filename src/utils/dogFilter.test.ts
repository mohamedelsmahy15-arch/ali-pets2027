import test from 'node:test';
import assert from 'node:assert/strict';
import {
  assessDogVaccination,
  countActiveFilterChips,
  DEFAULT_DOG_FILTER_STATE,
  deriveAvailableBreeds,
  filterAndSortDogs,
  findDogByListingId,
  getAvailablePriceBounds,
  getDocumentationBreakdown,
  getSimilarDogs,
  isRealVerifiedVaccination,
  matchesAgeBucket,
  matchesVaccinationFilter,
  parseDogFiltersFromSearch,
  parseListingCreatedAtMs,
  resolveDogAgeMonths,
  serializeDogFiltersToSearch,
  sortDogs,
} from './dogFilter';
import { countDogsForCategory } from './register';
import { DEMO_DOGS } from '../data/dogs';
import type { DogListing } from '../types';

function makeFixtureDog(overrides: Partial<DogListing>): DogListing {
  return {
    listingId: 'AP-FIX-01',
    isDemo: false,
    illustrative: false,
    breedKey: 'golden-retriever',
    breed: { ar: 'جولدن ريتريفر', en: 'Golden Retriever' },
    title: { ar: 'كلب اختبار', en: 'Fixture Dog' },
    ageMonths: 4,
    ageLabel: { ar: '4 شهور', en: '4 months' },
    gender: 'male',
    coatColor: { ar: 'ذهبي', en: 'Gold' },
    sizeCategory: 'large',
    availability: 'available',
    documentation: [
      {
        key: 'vaccination',
        status: 'not_documented',
      },
    ],
    media: [],
    createdAt: '2026-11-20T10:00:00Z',
    ...overrides,
  };
}

const FIXTURE_DOGS: DogListing[] = [
  makeFixtureDog({
    listingId: 'AP-FIX-01',
    breedKey: 'golden-retriever',
    breed: { ar: 'جولدن ريتريفر', en: 'Golden Retriever' },
    ageMonths: 2,
    sizeCategory: 'large',
    priceEgp: 12000,
    createdAt: '2026-11-24T10:00:00Z',
    documentation: [
      {
        key: 'vaccination',
        status: 'verified',
        sourceName: 'Alex Vet Clinic',
        documentDate: '2026-11-10',
        documentImages: ['/doc-vac.jpg'],
      },
    ],
  }),
  makeFixtureDog({
    listingId: 'AP-FIX-02',
    breedKey: 'french-bulldog',
    breed: { ar: 'فرنش بولدوج', en: 'French Bulldog' },
    ageMonths: 3,
    gender: 'female',
    sizeCategory: 'small',
    priceEgp: 18000,
    createdAt: '2026-11-22T10:00:00Z',
    documentation: [
      {
        key: 'vaccination',
        status: 'partially_documented',
        details: { ar: 'الجرعة الأولى فقط', en: 'First dose only' },
      },
    ],
  }),
  makeFixtureDog({
    listingId: 'AP-FIX-03',
    breedKey: 'beagle',
    breed: { ar: 'بيجل', en: 'Beagle' },
    ageMonths: 8,
    sizeCategory: undefined, // unknown size
    availability: 'reserved',
    createdAt: '2026-11-25T10:00:00Z',
    documentation: [
      {
        key: 'vaccination',
        // Explicitly verified status WITHOUT backing document -> must NOT count as vaccinated
        status: 'verified',
      },
    ],
  }),
  makeFixtureDog({
    listingId: 'AP-FIX-04',
    breedKey: 'pomeranian',
    breed: { ar: 'بوميرانيان', en: 'Pomeranian' },
    ageMonths: 14,
    gender: 'female',
    sizeCategory: 'small',
    createdAt: '', // missing createdAt
    birthDate: '2025-09-01', // must NEVER be used as createdAt
    documentation: [
      {
        key: 'vaccination',
        status: 'partially_documented', // no details or doc -> must NOT pass partial filter
      },
    ],
  }),
  makeFixtureDog({
    listingId: 'AP-FIX-05',
    breedKey: 'golden-retriever',
    availability: 'sold',
    priceEgp: 9000,
    createdAt: '2026-11-26T10:00:00Z',
  }),
];

test('URL filter parse and serialize round-trip preserves filters cleanly', () => {
  const state = parseDogFiltersFromSearch(
    '?q=AP-DEMO-01&breed=golden-retriever,beagle,golden-retriever&age=under-6&gender=male&size=large&minPrice=15000&maxPrice=8000&priceOnInquiry=0&vaccination=verified&availability=available&sort=price-asc'
  );

  assert.equal(state.q, 'AP-DEMO-01');
  assert.deepEqual(state.breeds, ['golden-retriever', 'beagle']);
  assert.deepEqual(state.ages, ['under-6']);
  assert.equal(state.gender, 'male');
  assert.deepEqual(state.sizes, ['large']);
  // Swaps inverted min/max cleanly
  assert.equal(state.minPrice, 8000);
  assert.equal(state.maxPrice, 15000);
  assert.equal(state.includePriceOnInquiry, false);
  assert.deepEqual(state.vaccinations, ['verified']);
  assert.deepEqual(state.availability, ['available']);
  assert.equal(state.sort, 'price-asc');

  const serialized = serializeDogFiltersToSearch(state);
  const reparsed = parseDogFiltersFromSearch(serialized);
  assert.deepEqual(reparsed, state);
  assert.equal(serializeDogFiltersToSearch(DEFAULT_DOG_FILTER_STATE), '');
  assert.equal(countActiveFilterChips(DEFAULT_DOG_FILTER_STATE), 0);
  assert.ok(countActiveFilterChips(state) > 0);
});

test('age resolution handles birthDate, ageMonths fallback, unknown age, and non-overlapping boundaries', () => {
  const ref = new Date('2026-11-25T00:00:00Z');

  // Uses birthDate when valid and in the past
  const withBirth = makeFixtureDog({ birthDate: '2026-08-10', ageMonths: 99 });
  assert.equal(resolveDogAgeMonths(withBirth, ref), 3);

  // Future birthDate falls back cleanly to explicit ageMonths
  const futureBirth = makeFixtureDog({ birthDate: '2027-01-01', ageMonths: 5 });
  assert.equal(resolveDogAgeMonths(futureBirth, ref), 5);

  // Missing birthDate uses ageMonths
  const noBirth = makeFixtureDog({ birthDate: undefined, ageMonths: 7 });
  assert.equal(resolveDogAgeMonths(noBirth, ref), 7);

  // Missing both returns null and matches no age bucket
  const unknownAge = makeFixtureDog({ birthDate: undefined, ageMonths: Number.NaN });
  assert.equal(resolveDogAgeMonths(unknownAge, ref), null);
  assert.equal(matchesAgeBucket(null, 'under-6'), false);

  // Half-open boundary checks (3, 6, 12 months) — zero overlap, zero gaps
  assert.equal(matchesAgeBucket(2, 'under-3'), true);
  assert.equal(matchesAgeBucket(3, 'under-3'), false);
  assert.equal(matchesAgeBucket(3, '3-6'), true);
  assert.equal(matchesAgeBucket(5, '3-6'), true);
  assert.equal(matchesAgeBucket(6, '3-6'), false);
  assert.equal(matchesAgeBucket(6, '6-12'), true);
  assert.equal(matchesAgeBucket(11, '6-12'), true);
  assert.equal(matchesAgeBucket(12, '6-12'), false);
  assert.equal(matchesAgeBucket(12, 'over-12'), true);

  // under-6 matches exact union of under-3 and 3-6
  for (const m of [0, 2, 3, 5, 6, 12]) {
    const unionMatch = matchesAgeBucket(m, 'under-3') || matchesAgeBucket(m, '3-6');
    assert.equal(matchesAgeBucket(m, 'under-6'), unionMatch);
  }
});

test('vaccination filter requires actual backing document evidence and distinguishes demo records', () => {
  const verifiedDoc = FIXTURE_DOGS[0];
  const partialWithDetails = FIXTURE_DOGS[1];
  const unbackedVerified = FIXTURE_DOGS[2];
  const emptyPartial = FIXTURE_DOGS[3];

  assert.equal(assessDogVaccination(verifiedDoc).state, 'verified_with_record');
  assert.equal(isRealVerifiedVaccination(verifiedDoc), true);
  assert.equal(matchesVaccinationFilter(verifiedDoc, ['verified']), true);

  assert.equal(assessDogVaccination(partialWithDetails).state, 'partial_record');
  assert.equal(matchesVaccinationFilter(partialWithDetails, ['verified']), false);
  assert.equal(matchesVaccinationFilter(partialWithDetails, ['partially_documented']), true);

  // Unbacked verified status MUST NOT pass vaccination filters
  assert.equal(assessDogVaccination(unbackedVerified).state, 'not_documented');
  assert.equal(isRealVerifiedVaccination(unbackedVerified), false);
  assert.equal(matchesVaccinationFilter(unbackedVerified, ['verified']), false);

  // Partially documented without any details or document MUST NOT pass
  assert.equal(assessDogVaccination(emptyPartial).state, 'not_documented');
  assert.equal(matchesVaccinationFilter(emptyPartial, ['partially_documented']), false);

  // Demo dogs are NEVER treated as real veterinary proof even if they carry demo sample records
  for (const demoDog of DEMO_DOGS) {
    assert.equal(isRealVerifiedVaccination(demoDog), false);
    assert.equal(assessDogVaccination(demoDog).isDemoSample, true);
  }
});

test('newest sort uses createdAt strictly, never birthDate, and handles missing dates & prices', () => {
  assert.equal(parseListingCreatedAtMs(FIXTURE_DOGS[3]), null);

  const activeOnly = FIXTURE_DOGS.filter((d) => d.availability !== 'sold');
  const newestSorted = sortDogs(activeOnly, 'newest');
  // AP-FIX-03 (Nov 25) -> AP-FIX-01 (Nov 24) -> AP-FIX-02 (Nov 22) -> AP-FIX-04 (missing createdAt goes LAST)
  assert.deepEqual(
    newestSorted.map((d) => d.listingId),
    ['AP-FIX-03', 'AP-FIX-01', 'AP-FIX-02', 'AP-FIX-04']
  );

  // Price sorts put unpriced dogs last
  const priceAsc = sortDogs(activeOnly, 'price-asc');
  assert.deepEqual(priceAsc.slice(0, 2).map((d) => d.listingId), ['AP-FIX-01', 'AP-FIX-02']);
  assert.equal(priceAsc[2].priceEgp, undefined);
  assert.equal(priceAsc[3].priceEgp, undefined);

  const priceDesc = sortDogs(activeOnly, 'price-desc');
  assert.deepEqual(priceDesc.slice(0, 2).map((d) => d.listingId), ['AP-FIX-02', 'AP-FIX-01']);

  assert.deepEqual(getAvailablePriceBounds(FIXTURE_DOGS), {
    hasPricedDogs: true,
    min: 12000,
    max: 18000,
  });
  // Current DEMO_DOGS have no prices -> must report hasPricedDogs: false without inventing bounds
  assert.deepEqual(getAvailablePriceBounds(DEMO_DOGS), {
    hasPricedDogs: false,
    min: null,
    max: null,
  });
});

test('filterAndSortDogs filters, searches, handles empty breed results, and aligns with DEMO_DOGS puppy count', () => {
  // Excludes sold AP-FIX-05
  const allActive = filterAndSortDogs(FIXTURE_DOGS, DEFAULT_DOG_FILTER_STATE);
  assert.equal(allActive.some((d) => d.listingId === 'AP-FIX-05'), false);

  // Search by ID
  const byId = filterAndSortDogs(FIXTURE_DOGS, {
    ...DEFAULT_DOG_FILTER_STATE,
    q: 'ap-fix-02',
  });
  assert.deepEqual(byId.map((d) => d.listingId), ['AP-FIX-02']);

  // Size filter excludes dog with undefined sizeCategory
  const smallOnly = filterAndSortDogs(FIXTURE_DOGS, {
    ...DEFAULT_DOG_FILTER_STATE,
    sizes: ['small'],
  });
  assert.deepEqual(smallOnly.map((d) => d.listingId), ['AP-FIX-02', 'AP-FIX-04']);

  // Unlisted breed returns 0 results cleanly
  const emptyBreed = filterAndSortDogs(FIXTURE_DOGS, {
    ...DEFAULT_DOG_FILTER_STATE,
    breeds: ['unlisted-breed'],
  });
  assert.equal(emptyBreed.length, 0);

  // DEMO_DOGS ?age=under-6 matches homepage puppies counter exactly
  const demoUnder6 = filterAndSortDogs(DEMO_DOGS, {
    ...DEFAULT_DOG_FILTER_STATE,
    ages: ['under-6'],
  });
  assert.equal(demoUnder6.length, countDogsForCategory(DEMO_DOGS, 'puppies'));

  // deriveAvailableBreeds & getSimilarDogs exclude sold and target dog
  const breeds = deriveAvailableBreeds(FIXTURE_DOGS);
  assert.equal(breeds.find((b) => b.breedKey === 'golden-retriever')?.count, 1);

  const similar = getSimilarDogs(FIXTURE_DOGS, FIXTURE_DOGS[1]); // small french-bulldog
  assert.equal(similar.some((d) => d.listingId === 'AP-FIX-02'), false);
  assert.equal(similar.some((d) => d.listingId === 'AP-FIX-05'), false);
  assert.deepEqual(similar.map((d) => d.listingId), ['AP-FIX-04']);
});

test('findDogByListingId and getDocumentationBreakdown separate proof-backed records from partial or unbacked entries', () => {
  assert.equal(findDogByListingId(DEMO_DOGS, 'ap-demo-02')?.listingId, 'AP-DEMO-02');
  assert.equal(findDogByListingId(DEMO_DOGS, 'AP-MISSING-99'), null);
  assert.equal(findDogByListingId(DEMO_DOGS, ''), null);

  // AP-DEMO-02 has 3 applicable items, 1 partially_documented, 0 verified with proof
  const demo2Breakdown = getDocumentationBreakdown(DEMO_DOGS[1]);
  assert.deepEqual(demo2Breakdown, {
    totalApplicable: 3,
    verifiedWithProofCount: 0,
    partialCount: 1,
    unrecordedCount: 2,
  });

  // AP-DEMO-03 has 3 applicable items, 2 verified with demo sample proof, 1 unrecorded
  const demo3Breakdown = getDocumentationBreakdown(DEMO_DOGS[2]);
  assert.deepEqual(demo3Breakdown, {
    totalApplicable: 3,
    verifiedWithProofCount: 2,
    partialCount: 0,
    unrecordedCount: 1,
  });

  // AP-DEMO-05 has 1 verified (demo proof), 1 partial, 1 unrecorded
  const demo5Breakdown = getDocumentationBreakdown(DEMO_DOGS[4]);
  assert.deepEqual(demo5Breakdown, {
    totalApplicable: 3,
    verifiedWithProofCount: 1,
    partialCount: 1,
    unrecordedCount: 1,
  });

  // Unbacked 'verified' status MUST be downgraded into unrecordedCount, NEVER verifiedWithProofCount
  const unbackedBreakdown = getDocumentationBreakdown(FIXTURE_DOGS[2]);
  assert.deepEqual(unbackedBreakdown, {
    totalApplicable: 1,
    verifiedWithProofCount: 0,
    partialCount: 0,
    unrecordedCount: 1,
  });
});

