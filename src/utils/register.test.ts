import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canSubmitRealInquiry,
  countDogsForCategory,
  detectLangFromPath,
  getCardBadgeDocItems,
  getVerifiedDocumentationCount,
  stripLangPrefix,
  toLocalizedPath,
} from './register';
import type { DogListing } from '../types';

const sampleDog: DogListing = {
  listingId: 'AP-DEMO-01',
  isDemo: true,
  illustrative: true,
  breedKey: 'golden-retriever',
  breed: { ar: 'جولدن ريتريفر', en: 'Golden Retriever' },
  title: { ar: 'نموذج تجريبي', en: 'Demo entry' },
  ageMonths: 3,
  ageLabel: { ar: '3 أشهر', en: '3 months' },
  gender: 'male',
  coatColor: { ar: 'ذهبي فاتح', en: 'Light Gold' },
  sizeCategory: 'large',
  expectedAdultSize: { ar: 'كبير', en: 'Large' },
  availability: 'available',
  createdAt: '2026-11-20',
  media: [],
  documentation: [
    {
      key: 'vaccination',
      status: 'verified',
      sourceName: 'Demo Clinic',
      documentDate: '2026-11-10',
      documentImages: ['/doc.jpg'],
    },
    {
      key: 'deworming',
      status: 'partially_documented',
      details: { ar: 'جزئي', en: 'Partial' },
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
};

test('bilingual route helpers preserve query string and hash', () => {
  assert.equal(detectLangFromPath('/'), 'ar');
  assert.equal(detectLangFromPath('/dogs'), 'ar');
  assert.equal(detectLangFromPath('/en'), 'en');
  assert.equal(detectLangFromPath('/en/dogs'), 'en');

  assert.equal(stripLangPrefix('/en/dogs'), '/dogs');
  assert.equal(stripLangPrefix('/en'), '/');
  assert.equal(
    toLocalizedPath('/dogs', 'en', '?size=small', '#top'),
    '/en/dogs?size=small#top'
  );
  assert.equal(
    toLocalizedPath('/en/about', 'ar', '', '#contact'),
    '/about#contact'
  );
});

test('category counts exclude sold dogs and compute puppy/size buckets', () => {
  const dogs: DogListing[] = [
    sampleDog,
    {
      ...sampleDog,
      listingId: 'AP-DEMO-02',
      ageMonths: 8,
      sizeCategory: 'small',
      availability: 'reserved',
    },
    {
      ...sampleDog,
      listingId: 'AP-DEMO-03',
      ageMonths: 2,
      sizeCategory: 'small',
      availability: 'sold',
    },
  ];

  assert.equal(countDogsForCategory(dogs, 'puppies'), 1);
  assert.equal(countDogsForCategory(dogs, 'small'), 1);
  assert.equal(countDogsForCategory(dogs, 'medium'), 0);
  assert.equal(countDogsForCategory(dogs, 'large'), 1);
});

test('documentation helpers never auto-verify and only show verified/partial card badges', () => {
  const unbackedVerified: DogListing = {
    ...sampleDog,
    documentation: [
      {
        key: 'vaccination',
        status: 'verified',
        // Missing sourceName / documentImages -> must NOT count as verified
      },
    ],
  };

  assert.deepEqual(getVerifiedDocumentationCount(sampleDog), {
    verified: 1,
    total: 3,
  });
  assert.deepEqual(getVerifiedDocumentationCount(unbackedVerified), {
    verified: 0,
    total: 1,
  });

  const badges = getCardBadgeDocItems(sampleDog);
  assert.equal(badges.length, 2);
  assert.deepEqual(
    badges.map((b) => b.key),
    ['vaccination', 'deworming']
  );
});

test('demo and sold dogs never allow real commercial inquiries', () => {
  assert.equal(canSubmitRealInquiry(sampleDog), false);
  assert.equal(
    canSubmitRealInquiry({ ...sampleDog, isDemo: false, availability: 'sold' }),
    false
  );
  assert.equal(
    canSubmitRealInquiry({ ...sampleDog, isDemo: false, availability: 'available' }),
    true
  );
});
