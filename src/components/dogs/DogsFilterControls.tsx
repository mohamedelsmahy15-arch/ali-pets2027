import React from 'react';
import { useLanguage } from '@/src/context/LanguageContext';
import type {
  DogAgeBucket,
  DogFilterState,
  DogGenderFilter,
  DogSize,
  DogVaccinationFilter,
} from '@/src/types';
import type { BreedOption } from './ActiveFilterChips';

interface DogsFilterControlsProps {
  filters: DogFilterState;
  breedOptions: BreedOption[];
  priceBounds: {
    hasPricedDogs: boolean;
    min: number | null;
    max: number | null;
  };
  onChange: (next: DogFilterState) => void;
  idPrefix: string;
}

const AGE_BUCKETS: DogAgeBucket[] = ['under-6', 'under-3', '3-6', '6-12', 'over-12'];
const SIZE_OPTIONS: DogSize[] = ['small', 'medium', 'large', 'giant'];
const GENDER_OPTIONS: DogGenderFilter[] = ['all', 'male', 'female'];
const VACCINATION_OPTIONS: DogVaccinationFilter[] = ['verified', 'partially_documented'];
const AVAILABILITY_OPTIONS: Array<'available' | 'reserved'> = ['available', 'reserved'];

function toggleInList<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function DogsFilterControls({
  filters,
  breedOptions,
  priceBounds,
  onChange,
  idPrefix,
}: DogsFilterControlsProps) {
  const { lang, t } = useLanguage();

  const handlePriceInput = (field: 'minPrice' | 'maxPrice', raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      onChange({ ...filters, [field]: undefined });
      return;
    }
    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed) || parsed < 0) return;
    onChange({ ...filters, [field]: parsed });
  };

  return (
    <div className="divide-y divide-[#D8C6AA]/70">
      {/* 1. Breed */}
      <fieldset className="pb-5 space-y-3">
        <legend className="text-[15px] font-semibold text-[#263B30]">
          {t.archive.groups.breed}
        </legend>
        <div className="space-y-2">
          {breedOptions.map((option) => {
            const checked = filters.breeds.includes(option.breedKey);
            const inputId = `${idPrefix}-breed-${option.breedKey}`;
            return (
              <label
                key={option.breedKey}
                htmlFor={inputId}
                className="flex items-center justify-between gap-3 py-1 cursor-pointer select-none group"
              >
                <span className="flex items-center gap-2.5 text-[15px] text-[#1E2A23] group-hover:text-[#263B30]">
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      onChange({
                        ...filters,
                        breeds: toggleInList(filters.breeds, option.breedKey),
                      })
                    }
                    className="w-4 h-4 rounded border-[#718066] text-[#263B30] accent-[#263B30] cursor-pointer"
                  />
                  <span>{option.breed[lang]}</span>
                </span>
                <span className="text-[13px] font-mono-code text-[#55634B] tabular-nums">
                  {option.count}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 2. Age */}
      <fieldset className="py-5 space-y-3">
        <legend className="text-[15px] font-semibold text-[#263B30]">
          {t.archive.groups.age}
        </legend>
        <div className="space-y-2">
          {AGE_BUCKETS.map((bucket) => {
            const checked = filters.ages.includes(bucket);
            const inputId = `${idPrefix}-age-${bucket}`;
            return (
              <label
                key={bucket}
                htmlFor={inputId}
                className="flex items-center gap-2.5 py-1 text-[15px] text-[#1E2A23] hover:text-[#263B30] cursor-pointer select-none"
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      ages: toggleInList(filters.ages, bucket),
                    })
                  }
                  className="w-4 h-4 rounded border-[#718066] text-[#263B30] accent-[#263B30] cursor-pointer"
                />
                <span>{t.archive.ages[bucket]}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 3. Gender */}
      <fieldset className="py-5 space-y-3">
        <legend className="text-[15px] font-semibold text-[#263B30]">
          {t.archive.groups.gender}
        </legend>
        <div className="grid grid-cols-3 gap-2" role="radiogroup">
          {GENDER_OPTIONS.map((gender) => {
            const active = filters.gender === gender;
            const inputId = `${idPrefix}-gender-${gender}`;
            return (
              <label
                key={gender}
                htmlFor={inputId}
                className={`min-h-[42px] px-2.5 py-2 rounded-[10px] border text-[14px] font-medium text-center flex items-center justify-center cursor-pointer transition-colors ${
                  active
                    ? 'bg-[#263B30] text-[#F7F3EA] border-[#263B30]'
                    : 'bg-[#F7F3EA] text-[#263B30] border-[#D8C6AA] hover:bg-[#EDE3D1]'
                }`}
              >
                <input
                  id={inputId}
                  type="radio"
                  name={`${idPrefix}-gender`}
                  value={gender}
                  checked={active}
                  onChange={() => onChange({ ...filters, gender })}
                  className="sr-only"
                />
                <span>{t.archive.genders[gender]}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 4. Size */}
      <fieldset className="py-5 space-y-3">
        <legend className="text-[15px] font-semibold text-[#263B30]">
          {t.archive.groups.size}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {SIZE_OPTIONS.map((size) => {
            const checked = filters.sizes.includes(size);
            const inputId = `${idPrefix}-size-${size}`;
            return (
              <label
                key={size}
                htmlFor={inputId}
                className={`min-h-[42px] px-3 py-2 rounded-[10px] border text-[14px] font-medium flex items-center gap-2 cursor-pointer transition-colors select-none ${
                  checked
                    ? 'bg-[#EDE3D1] text-[#263B30] border-[#263B30]'
                    : 'bg-[#F7F3EA]/70 text-[#1E2A23] border-[#D8C6AA] hover:bg-[#EDE3D1]/60'
                }`}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      sizes: toggleInList(filters.sizes, size),
                    })
                  }
                  className="w-4 h-4 rounded border-[#718066] text-[#263B30] accent-[#263B30] cursor-pointer"
                />
                <span>{t.archive.sizes[size]}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 5. Vaccination Records */}
      <fieldset className="py-5 space-y-3">
        <legend className="text-[15px] font-semibold text-[#263B30]">
          {t.archive.groups.vaccination}
        </legend>
        <div className="space-y-2">
          {VACCINATION_OPTIONS.map((vac) => {
            const checked = filters.vaccinations.includes(vac);
            const inputId = `${idPrefix}-vac-${vac}`;
            return (
              <label
                key={vac}
                htmlFor={inputId}
                className="flex items-center gap-2.5 py-1 text-[15px] text-[#1E2A23] hover:text-[#263B30] cursor-pointer select-none"
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      vaccinations: toggleInList(filters.vaccinations, vac),
                    })
                  }
                  className="w-4 h-4 rounded border-[#718066] text-[#263B30] accent-[#263B30] cursor-pointer"
                />
                <span>{t.archive.vaccinations[vac]}</span>
              </label>
            );
          })}
        </div>
        <p className="text-[13px] leading-[1.55] text-[#55634B]">
          {t.archive.vaccinationDemoHint}
        </p>
      </fieldset>

      {/* 6. Availability */}
      <fieldset className="py-5 space-y-3">
        <legend className="text-[15px] font-semibold text-[#263B30]">
          {t.archive.groups.availability}
        </legend>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map((avail) => {
            const checked = filters.availability.includes(avail);
            const inputId = `${idPrefix}-avail-${avail}`;
            return (
              <label
                key={avail}
                htmlFor={inputId}
                className="flex items-center gap-2.5 py-1 text-[15px] text-[#1E2A23] hover:text-[#263B30] cursor-pointer select-none"
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...filters,
                      availability: toggleInList(filters.availability, avail),
                    })
                  }
                  className="w-4 h-4 rounded border-[#718066] text-[#263B30] accent-[#263B30] cursor-pointer"
                />
                <span>{t.archive.availabilities[avail]}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 7. Price (honest handling when unpriced) */}
      <fieldset className="pt-5 space-y-3">
        <legend className="text-[15px] font-semibold text-[#263B30]">
          {t.archive.groups.price}
        </legend>

        {priceBounds.hasPricedDogs ||
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor={`${idPrefix}-min-price`}
                  className="block text-[13px] text-[#55634B] mb-1"
                >
                  {t.archive.minPriceLabel}
                </label>
                <input
                  id={`${idPrefix}-min-price`}
                  type="number"
                  min={0}
                  inputMode="numeric"
                  placeholder={priceBounds.min !== null ? String(priceBounds.min) : '0'}
                  value={filters.minPrice ?? ''}
                  onChange={(e) => handlePriceInput('minPrice', e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 rounded-[10px] border border-[#D8C6AA] bg-[#F7F3EA] text-[14px] text-[#1E2A23] tabular-nums"
                />
              </div>
              <div>
                <label
                  htmlFor={`${idPrefix}-max-price`}
                  className="block text-[13px] text-[#55634B] mb-1"
                >
                  {t.archive.maxPriceLabel}
                </label>
                <input
                  id={`${idPrefix}-max-price`}
                  type="number"
                  min={0}
                  inputMode="numeric"
                  placeholder={priceBounds.max !== null ? String(priceBounds.max) : ''}
                  value={filters.maxPrice ?? ''}
                  onChange={(e) => handlePriceInput('maxPrice', e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 rounded-[10px] border border-[#D8C6AA] bg-[#F7F3EA] text-[14px] text-[#1E2A23] tabular-nums"
                />
              </div>
            </div>

            <label
              htmlFor={`${idPrefix}-price-inquiry`}
              className="flex items-center gap-2.5 py-1 text-[14px] text-[#1E2A23] cursor-pointer select-none"
            >
              <input
                id={`${idPrefix}-price-inquiry`}
                type="checkbox"
                checked={filters.includePriceOnInquiry}
                onChange={(e) =>
                  onChange({ ...filters, includePriceOnInquiry: e.target.checked })
                }
                className="w-4 h-4 rounded border-[#718066] text-[#263B30] accent-[#263B30] cursor-pointer"
              />
              <span>{t.archive.includePriceOnInquiry}</span>
            </label>
          </div>
        ) : (
          <p className="text-[14px] leading-[1.6] text-[#55634B] bg-[#F7F3EA] border border-[#D8C6AA]/80 rounded-[12px] p-3">
            {t.archive.pricePendingNote}
          </p>
        )}
      </fieldset>
    </div>
  );
}
