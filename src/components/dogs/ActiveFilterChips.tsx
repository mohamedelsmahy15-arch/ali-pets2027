import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';
import type { DogFilterState } from '@/src/types';

export interface BreedOption {
  breedKey: string;
  breed: { ar: string; en: string };
  count: number;
}

interface ActiveFilterChipsProps {
  filters: DogFilterState;
  breedOptions: BreedOption[];
  onChange: (next: DogFilterState) => void;
  onResetAll: () => void;
}

interface ChipItem {
  id: string;
  label: string;
  onRemove: () => void;
}

export function ActiveFilterChips({
  filters,
  breedOptions,
  onChange,
  onResetAll,
}: ActiveFilterChipsProps) {
  const { lang, t } = useLanguage();
  const chips: ChipItem[] = [];

  if (filters.q.trim()) {
    chips.push({
      id: 'q',
      label: lang === 'ar' ? `بحث: ${filters.q.trim()}` : `Search: ${filters.q.trim()}`,
      onRemove: () => onChange({ ...filters, q: '' }),
    });
  }

  for (const breedKey of filters.breeds) {
    const match = breedOptions.find((b) => b.breedKey === breedKey);
    chips.push({
      id: `breed-${breedKey}`,
      label: match ? match.breed[lang] : breedKey,
      onRemove: () =>
        onChange({
          ...filters,
          breeds: filters.breeds.filter((b) => b !== breedKey),
        }),
    });
  }

  for (const age of filters.ages) {
    chips.push({
      id: `age-${age}`,
      label: t.archive.ages[age],
      onRemove: () =>
        onChange({
          ...filters,
          ages: filters.ages.filter((a) => a !== age),
        }),
    });
  }

  if (filters.gender !== 'all') {
    chips.push({
      id: `gender-${filters.gender}`,
      label: `${t.archive.groups.gender}: ${t.archive.genders[filters.gender]}`,
      onRemove: () => onChange({ ...filters, gender: 'all' }),
    });
  }

  for (const size of filters.sizes) {
    chips.push({
      id: `size-${size}`,
      label: `${t.archive.groups.size}: ${t.archive.sizes[size]}`,
      onRemove: () =>
        onChange({
          ...filters,
          sizes: filters.sizes.filter((s) => s !== size),
        }),
    });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const minLabel =
      filters.minPrice !== undefined ? filters.minPrice.toLocaleString('en-US') : '0';
    const maxLabel =
      filters.maxPrice !== undefined ? filters.maxPrice.toLocaleString('en-US') : '∞';
    chips.push({
      id: 'price-range',
      label: `${t.archive.groups.price}: ${minLabel} – ${maxLabel}`,
      onRemove: () =>
        onChange({ ...filters, minPrice: undefined, maxPrice: undefined }),
    });
  }

  if (!filters.includePriceOnInquiry) {
    chips.push({
      id: 'price-inquiry-excluded',
      label:
        lang === 'ar'
          ? 'استبعاد: اسأل عن السعر'
          : 'Excluding: Ask for price',
      onRemove: () => onChange({ ...filters, includePriceOnInquiry: true }),
    });
  }

  for (const vac of filters.vaccinations) {
    chips.push({
      id: `vac-${vac}`,
      label: t.archive.vaccinations[vac],
      onRemove: () =>
        onChange({
          ...filters,
          vaccinations: filters.vaccinations.filter((v) => v !== vac),
        }),
    });
  }

  for (const avail of filters.availability) {
    chips.push({
      id: `avail-${avail}`,
      label: t.archive.availabilities[avail],
      onRemove: () =>
        onChange({
          ...filters,
          availability: filters.availability.filter((a) => a !== avail),
        }),
    });
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label={t.archive.activeFiltersLabel}
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          aria-label={
            lang === 'ar' ? `إزالة فلتر ${chip.label}` : `Remove filter ${chip.label}`
          }
          className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-[8px] bg-[#EDE3D1] border border-[#D8C6AA] text-[14px] font-medium text-[#263B30] hover:bg-[#D8C6AA]/55 transition-colors cursor-pointer"
        >
          <span>{chip.label}</span>
          <X className="w-3.5 h-3.5 shrink-0 text-[#55634B]" strokeWidth={1.8} aria-hidden="true" />
        </button>
      ))}

      <button
        type="button"
        onClick={onResetAll}
        className="inline-flex items-center min-h-[36px] px-2.5 py-1 text-[14px] font-medium text-[#8E5F3C] hover:text-[#263B30] underline underline-offset-4 transition-colors cursor-pointer"
      >
        {t.archive.resetAll}
      </button>
    </div>
  );
}
