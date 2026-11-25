import type { CategoryTileData, DocStatus, DogListing, Language } from '@/src/types';

export function detectLangFromPath(pathname: string): Language {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ar';
}

export function stripLangPrefix(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) {
    return pathname.slice(3) || '/';
  }
  return pathname || '/';
}

export function toLocalizedPath(
  path: string,
  lang: Language,
  search = '',
  hash = ''
): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const cleanBase = stripLangPrefix(normalized);
  const prefixed = lang === 'en' ? (cleanBase === '/' ? '/en' : `/en${cleanBase}`) : cleanBase;
  return `${prefixed}${search}${hash}`;
}

export function getActiveListings(dogs: DogListing[]): DogListing[] {
  return dogs.filter((dog) => dog.availability !== 'sold');
}

export function countDogsForCategory(
  dogs: DogListing[],
  categoryId: CategoryTileData['id']
): number {
  const active = getActiveListings(dogs);
  switch (categoryId) {
    case 'puppies':
      return active.filter((dog) => dog.ageMonths < 6).length;
    case 'small':
      return active.filter((dog) => dog.sizeCategory === 'small').length;
    case 'medium':
      return active.filter((dog) => dog.sizeCategory === 'medium').length;
    case 'large':
      return active.filter(
        (dog) => dog.sizeCategory === 'large' || dog.sizeCategory === 'giant'
      ).length;
    default:
      return 0;
  }
}

export function getVerifiedDocumentationCount(dog: DogListing): {
  verified: number;
  total: number;
} {
  const applicable = dog.documentation.filter((item) => item.applicable !== false);
  const verified = applicable.filter(
    (item) =>
      item.status === 'verified' &&
      Boolean(item.sourceName) &&
      Boolean(item.documentDate) &&
      Array.isArray(item.documentImages) &&
      item.documentImages.length > 0
  ).length;
  return { verified, total: applicable.length };
}

/**
 * Only items explicitly marked 'verified' or 'partially_documented' may appear as badge previews on DogCard.
 * Never auto-promote 'not_documented' or 'not_provided'.
 */
export function getCardBadgeDocItems(dog: DogListing) {
  return dog.documentation.filter(
    (item) =>
      item.applicable !== false &&
      (item.status === 'verified' || item.status === 'partially_documented')
  );
}

/**
 * Strictly blocks real commercial inquiries for demonstration listings or sold listings.
 */
export function canSubmitRealInquiry(dog: DogListing): boolean {
  if (dog.isDemo) return false;
  if (dog.availability === 'sold') return false;
  return true;
}

export function getDocStatusOrderScore(status: DocStatus): number {
  switch (status) {
    case 'verified':
      return 3;
    case 'partially_documented':
      return 2;
    case 'not_documented':
      return 1;
    case 'not_provided':
      return 0;
  }
}
