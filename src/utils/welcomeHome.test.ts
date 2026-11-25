import test from 'node:test';
import assert from 'node:assert/strict';
import { DEMO_DOGS } from '../data/dogs';
import type { DogListing } from '../types';
import { getWelcomeHomeRecommendations } from './welcomeHome';

const BASE_DOG: Pick<DogListing, 'ageMonths' | 'birthDate' | 'sizeCategory'> = {
  ageMonths: 3,
  sizeCategory: 'large',
};

test('caps recommendations at 3 items and distinguishes puppy vs older dogs using recorded data', () => {
  // 3-month large puppy (Golden demo)
  const goldenResult = getWelcomeHomeRecommendations(DEMO_DOGS[0]);
  assert.equal(goldenResult.isPersonalized, true);
  assert.equal(goldenResult.basisSummary, 'age_and_size');
  assert.equal(goldenResult.recommendations.length, 3);
  assert.deepEqual(
    goldenResult.recommendations.map((r) => r.item.id),
    ['acc-harness', 'acc-toy', 'acc-bowls']
  );

  // 4-month small puppy (Frenchie demo)
  const frenchieResult = getWelcomeHomeRecommendations(DEMO_DOGS[1]);
  assert.equal(frenchieResult.isPersonalized, true);
  assert.equal(frenchieResult.recommendations.length, 3);
  assert.deepEqual(
    frenchieResult.recommendations.map((r) => r.item.id),
    ['acc-harness', 'acc-toy', 'acc-bed']
  );

  // 7-month small dog (Pomeranian demo)
  const pomResult = getWelcomeHomeRecommendations(DEMO_DOGS[3]);
  assert.equal(pomResult.isPersonalized, true);
  assert.equal(pomResult.recommendations.length, 3);
  assert.deepEqual(
    pomResult.recommendations.map((r) => r.item.id),
    ['acc-leash', 'acc-bed', 'acc-brush']
  );
});

test('falls back honestly to general starter recommendations when age and size are missing', () => {
  const incompleteDog: Pick<DogListing, 'ageMonths' | 'birthDate' | 'sizeCategory'> = {
    ageMonths: Number.NaN,
    birthDate: undefined,
    sizeCategory: undefined,
  };

  const result = getWelcomeHomeRecommendations(incompleteDog);
  assert.equal(result.isPersonalized, false);
  assert.equal(result.basisSummary, 'general_starter');
  assert.equal(result.recommendations.length, 3);
  for (const rec of result.recommendations) {
    assert.equal(rec.basis, 'general_starter');
  }
  assert.match(result.recommendations[0].reason.ar, /عام/);
  assert.match(result.recommendations[0].reason.en, /General first-day starter/i);
});

test('handles partial metadata (age-only or size-only) without inventing missing fields', () => {
  const ageOnlyResult = getWelcomeHomeRecommendations({
    ageMonths: 4,
    sizeCategory: undefined,
  });
  assert.equal(ageOnlyResult.isPersonalized, true);
  assert.equal(ageOnlyResult.basisSummary, 'age_only');
  assert.equal(ageOnlyResult.recommendations.length, 3);

  const sizeOnlyResult = getWelcomeHomeRecommendations({
    ...BASE_DOG,
    ageMonths: -1,
    birthDate: undefined,
    sizeCategory: 'medium',
  });
  assert.equal(sizeOnlyResult.isPersonalized, true);
  assert.equal(sizeOnlyResult.basisSummary, 'size_only');
  assert.equal(sizeOnlyResult.recommendations.length, 3);
  assert.match(sizeOnlyResult.recommendations[0].reason.ar, /العمر غير مسجل/);
  assert.match(sizeOnlyResult.recommendations[0].reason.en, /age is not recorded/i);
});
