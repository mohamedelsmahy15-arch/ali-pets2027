import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useLanguage } from '@/src/context/LanguageContext';
import type { DogFilterState, DogListing } from '@/src/types';
import { DEFAULT_DOG_FILTER_STATE, filterAndSortDogs } from '@/src/utils/dogFilter';
import type { BreedOption } from './ActiveFilterChips';
import { DogsFilterControls } from './DogsFilterControls';

interface MobileFilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: DogFilterState;
  dogs: DogListing[];
  breedOptions: BreedOption[];
  priceBounds: {
    hasPricedDogs: boolean;
    min: number | null;
    max: number | null;
  };
  onApply: (next: DogFilterState) => void;
}

export function MobileFilterSheet({
  open,
  onClose,
  filters,
  dogs,
  breedOptions,
  priceBounds,
  onApply,
}: MobileFilterSheetProps) {
  const { lang, t } = useLanguage();
  const [draft, setDraft] = useState<DogFilterState>(filters);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setDraft(filters);
    }
  }, [open, filters]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  const draftPreviewCount = useMemo(
    () => filterAndSortDogs(dogs, draft).length,
    [dogs, draft]
  );

  if (!open) return null;

  const handleResetDraft = () => {
    setDraft({
      ...DEFAULT_DOG_FILTER_STATE,
      q: draft.q,
      sort: draft.sort,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#263B30]/45 backdrop-blur-[2px] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filters-title"
      onClick={onClose}
    >
      <div
        className="w-full max-h-[88svh] flex flex-col bg-[#FFFDF8] border-t border-[#D8C6AA] rounded-t-[24px] shadow-elevated overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle & Header */}
        <div className="px-5 pt-3 pb-4 border-b border-[#D8C6AA]/80 bg-[#FFFDF8] shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#D8C6AA] mx-auto mb-3" aria-hidden="true" />
          <div className="flex items-center justify-between gap-3">
            <h2
              id="mobile-filters-title"
              className={`text-[20px] font-semibold text-[#263B30] ${
                lang === 'ar' ? 'font-display-ar' : 'font-display-en'
              }`}
            >
              {t.archive.filtersTitle}
            </h2>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetDraft}
                className="min-h-[40px] px-3 text-[14px] font-medium text-[#8E5F3C] hover:text-[#263B30] underline underline-offset-4 cursor-pointer"
              >
                {t.archive.resetAll}
              </button>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label={t.archive.closeSheet}
                className="min-w-[44px] min-h-[44px] -me-2 inline-flex items-center justify-center rounded-[12px] text-[#263B30] hover:bg-[#EDE3D1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Filter Controls */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <DogsFilterControls
            filters={draft}
            breedOptions={breedOptions}
            priceBounds={priceBounds}
            onChange={setDraft}
            idPrefix="mobile-filter"
          />
        </div>

        {/* Sticky Apply Bar */}
        <div className="px-5 py-4 border-t border-[#D8C6AA] bg-[#FFFDF8] shrink-0">
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              onApply(draft);
              onClose();
            }}
          >
            {t.archive.applyFilters(draftPreviewCount)}
          </Button>
        </div>
      </div>
    </div>
  );
}
