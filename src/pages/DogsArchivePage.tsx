import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActiveFilterChips, type BreedOption } from '@/src/components/dogs/ActiveFilterChips';
import { DogsFilterControls } from '@/src/components/dogs/DogsFilterControls';
import { MobileFilterSheet } from '@/src/components/dogs/MobileFilterSheet';
import { Button } from '@/src/components/ui/Button';
import { DogCard } from '@/src/components/ui/DogCard';
import { EmptyIllustration } from '@/src/components/ui/EmptyIllustration';
import { useLanguage } from '@/src/context/LanguageContext';
import { FEATURED_BREEDS } from '@/src/data/breeds';
import { DEMO_DOGS } from '@/src/data/dogs';
import type { DogFilterState, DogSortOption } from '@/src/types';
import {
  countActiveFilterChips,
  DEFAULT_DOG_FILTER_STATE,
  deriveAvailableBreeds,
  filterAndSortDogs,
  getAvailablePriceBounds,
  parseDogFiltersFromSearch,
  serializeDogFiltersToSearch,
} from '@/src/utils/dogFilter';

interface DogsArchivePageProps {
  onOpenWhatsApp: () => void;
}

export function DogsArchivePage({ onOpenWhatsApp }: DogsArchivePageProps) {
  const { lang, t, localizedPath } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const filters = useMemo(
    () => parseDogFiltersFromSearch(location.search),
    [location.search]
  );

  const [searchInput, setSearchInput] = useState(filters.q);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL query changes (back/forward navigation, category tiles, reset) into search input
  useEffect(() => {
    setSearchInput((prev) => (prev === filters.q ? prev : filters.q));
  }, [filters.q]);

  const applyFilters = (next: DogFilterState, replace = false) => {
    const nextSearch = serializeDogFiltersToSearch(next);
    if (nextSearch === location.search) return;
    navigate(localizedPath('/dogs', nextSearch), { replace });
  };

  // Debounced search synced with URL query string
  useEffect(() => {
    const trimmedInput = searchInput.trim();
    if (trimmedInput === filters.q) return;

    const timer = window.setTimeout(() => {
      applyFilters({ ...filters, q: trimmedInput }, true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [searchInput, filters]);

  const breedOptions: BreedOption[] = useMemo(() => {
    const available = deriveAvailableBreeds(DEMO_DOGS);
    const knownKeys = new Set(available.map((b) => b.breedKey));
    const merged: BreedOption[] = [...available];

    // Preserve any selected breed from URL (e.g. Cocker Spaniel from breed guide) with count 0
    for (const selectedKey of filters.breeds) {
      if (knownKeys.has(selectedKey)) continue;
      const guideMatch = FEATURED_BREEDS.find((b) => b.breedKey === selectedKey);
      merged.push({
        breedKey: selectedKey,
        breed: guideMatch ? guideMatch.name : { ar: selectedKey, en: selectedKey },
        count: 0,
      });
    }

    return merged;
  }, [filters.breeds]);

  const priceBounds = useMemo(() => getAvailablePriceBounds(DEMO_DOGS), []);

  const filteredDogs = useMemo(
    () => filterAndSortDogs(DEMO_DOGS, filters),
    [filters]
  );

  const activeFilterCount = useMemo(
    () => countActiveFilterChips(filters),
    [filters]
  );

  const handleResetAll = () => {
    setSearchInput('');
    applyFilters(DEFAULT_DOG_FILTER_STATE);
  };

  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <div className="pt-[64px] md:pt-[72px] bg-[#F7F3EA]">
      {/* Header & Honest Demo Notice */}
      <section className="border-b border-[#D8C6AA] bg-[#FFFDF8]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-12 space-y-5">
          <div className="max-w-[760px] space-y-2.5">
            <p className="text-[14px] font-medium text-[#8E5F3C]">{t.archive.eyebrow}</p>
            <h1 className={`${displayFont} type-hero text-[#263B30]`}>
              {t.archive.title}
            </h1>
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#55634B]">
              {t.archive.subtitle}
            </p>
          </div>

          <div className="px-4 py-3 rounded-[12px] bg-[#EDE3D1]/80 border border-[#D8C6AA] text-[14px] font-medium text-[#8E5F3C] max-w-[760px]">
            {t.demo.siteNotice}
          </div>
        </div>
      </section>

      {/* Main Archive Layout: Desktop Sidebar + Results Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Sidebar (lg and up) */}
          <aside
            aria-label={t.archive.filtersTitle}
            className="hidden lg:block w-[296px] xl:w-[310px] shrink-0 sticky top-[88px] max-h-[calc(100vh-104px)] overflow-y-auto bg-[#FFFDF8] border border-[#D8C6AA] rounded-[20px] p-5"
          >
            <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[#D8C6AA]">
              <h2 className={`${displayFont} text-[19px] font-semibold text-[#263B30]`}>
                {t.archive.filtersTitle}
              </h2>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="text-[13px] font-medium text-[#8E5F3C] hover:text-[#263B30] underline underline-offset-4 cursor-pointer"
                >
                  {t.archive.resetAll}
                </button>
              )}
            </div>

            <DogsFilterControls
              filters={filters}
              breedOptions={breedOptions}
              priceBounds={priceBounds}
              onChange={(next) => applyFilters(next)}
              idPrefix="desktop-filter"
            />
          </aside>

          {/* Main Search, Sort, Chips & Grid */}
          <div className="flex-1 min-w-0 w-full space-y-5">
            {/* Search & Controls Bar */}
            <div className="bg-[#FFFDF8] border border-[#D8C6AA] rounded-[20px] p-4 md:p-5 space-y-4">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                {/* Search Input */}
                <form
                  className="relative flex-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    applyFilters({ ...filters, q: searchInput.trim() });
                  }}
                >
                  <label htmlFor="dogs-archive-search" className="sr-only">
                    {t.archive.searchLabel}
                  </label>
                  <Search
                    className="w-5 h-5 text-[#718066] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <input
                    id="dogs-archive-search"
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={t.archive.searchPlaceholder}
                    className="w-full min-h-[48px] ps-11 pe-11 py-2.5 rounded-[12px] border border-[#D8C6AA] bg-[#F7F3EA] text-[15px] text-[#1E2A23] placeholder:text-[#7A7467] focus:border-[#263B30] focus:bg-[#FFFDF8] transition-colors"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        applyFilters({ ...filters, q: '' });
                      }}
                      aria-label={t.archive.clearSearch}
                      className="min-w-[40px] min-h-[40px] absolute top-1/2 -translate-y-1/2 end-1 inline-flex items-center justify-center rounded-[10px] text-[#55634B] hover:text-[#263B30] hover:bg-[#EDE3D1] transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" strokeWidth={1.8} />
                    </button>
                  )}
                </form>

                {/* Mobile Filter Trigger + Sort Dropdown */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden shrink-0 min-h-[48px] px-4 py-2.5 rounded-[12px] border border-[#263B30] bg-[#F7F3EA] text-[#263B30] text-[15px] font-medium inline-flex items-center justify-center gap-2 hover:bg-[#EDE3D1] transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                    <span>{t.archive.filtersButton}</span>
                    {activeFilterCount > 0 && (
                      <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#263B30] text-[#F7F3EA] text-[12px] font-mono-code inline-flex items-center justify-center tabular-nums">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <div className="relative flex-1 min-w-0 sm:flex-none sm:min-w-[220px]">
                    <label htmlFor="dogs-archive-sort" className="sr-only">
                      {t.archive.sortLabel}
                    </label>
                    <ArrowUpDown
                      className="w-4 h-4 text-[#55634B] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <select
                      id="dogs-archive-sort"
                      value={filters.sort}
                      onChange={(e) =>
                        applyFilters({
                          ...filters,
                          sort: e.target.value as DogSortOption,
                        })
                      }
                      className="appearance-none w-full min-h-[48px] ps-10 pe-9 py-2.5 rounded-[12px] border border-[#D8C6AA] bg-[#F7F3EA] text-[15px] font-medium text-[#263B30] cursor-pointer"
                    >
                      <option value="newest">{t.archive.sortOptions.newest}</option>
                      <option value="price-asc">{t.archive.sortOptions['price-asc']}</option>
                      <option value="price-desc">{t.archive.sortOptions['price-desc']}</option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-[#55634B] absolute top-1/2 -translate-y-1/2 end-3 pointer-events-none"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {(filters.sort === 'price-asc' || filters.sort === 'price-desc') &&
                !priceBounds.hasPricedDogs && (
                  <p className="text-[13px] text-[#55634B]">
                    {t.archive.priceSortNote}
                  </p>
                )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#D8C6AA]/60">
                <p
                  aria-live="polite"
                  className="text-[15px] font-medium text-[#263B30] tabular-nums"
                >
                  {t.archive.resultsCount(filteredDogs.length)}
                </p>

                <ActiveFilterChips
                  filters={filters}
                  breedOptions={breedOptions}
                  onChange={(next) => applyFilters(next)}
                  onResetAll={handleResetAll}
                />
              </div>
            </div>

            {/* Cards Grid or Empty State */}
            {filteredDogs.length > 0 ? (
              <div
                data-testid="dogs-archive-grid"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredDogs.map((dog) => (
                  <DogCard
                    key={dog.listingId}
                    dog={dog}
                    compactDocSummary
                  />
                ))}
              </div>
            ) : (
              <div
                data-testid="dogs-archive-empty"
                className="bg-[#FFFDF8] border border-[#D8C6AA] rounded-[20px] px-6 py-12 md:py-16 text-center space-y-5"
              >
                <div className="flex justify-center">
                  <EmptyIllustration kind="search" className="w-20 h-20" />
                </div>
                <div className="max-w-[480px] mx-auto space-y-2">
                  <h2 className={`${displayFont} type-sub-h3 text-[#263B30]`}>
                    {t.archive.emptyTitle}
                  </h2>
                  <p className="text-[16px] leading-[1.7] text-[#55634B]">
                    {t.archive.emptyBody}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Button variant="primary" onClick={handleResetAll}>
                    {t.archive.resetAll}
                  </Button>
                  <Button variant="secondary" onClick={onOpenWhatsApp}>
                    {t.archive.emptyAskWhatsapp}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Bottom Sheet */}
      <MobileFilterSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        dogs={DEMO_DOGS}
        breedOptions={breedOptions}
        priceBounds={priceBounds}
        onApply={(next) => applyFilters(next)}
      />
    </div>
  );
}
