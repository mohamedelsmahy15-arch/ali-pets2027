import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/src/context/LanguageContext';
import type { DogListing } from '@/src/types';
import { assessDogVaccination } from '@/src/utils/dogFilter';
import { getCardBadgeDocItems } from '@/src/utils/register';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import {
  AvailabilityBadge,
  DocStatusBadge,
  RegisterStamp,
} from '@/src/components/ui/StatusBadge';

interface DogCardProps {
  dog: DogListing;
  onSelectDemo?: (dog: DogListing) => void;
  compactDocSummary?: boolean;
}

export function DogCard({ dog, onSelectDemo, compactDocSummary = false }: DogCardProps) {
  const { lang, t, localizedPath } = useLanguage();
  const primaryMedia = dog.media[0];
  const docBadges = compactDocSummary ? [] : getCardBadgeDocItems(dog);
  const vaccinationAssessment = compactDocSummary ? assessDogVaccination(dog) : null;

  const ageText = dog.ageLabel[lang];
  const genderText = t.card.gender[dog.gender];
  const sizeText = dog.expectedAdultSize ? dog.expectedAdultSize[lang] : null;
  const priceText =
    typeof dog.priceEgp === 'number'
      ? `${dog.priceEgp.toLocaleString('en-US')} ${lang === 'ar' ? 'ج.م' : 'EGP'}`
      : t.card.priceOnInquiry;

  const detailPath = localizedPath(`/dogs/${dog.listingId}`);
  const useDemoModalCallback = Boolean(onSelectDemo && dog.isDemo);

  return (
    <article
      data-testid={`dog-card-${dog.listingId}`}
      className="group flex flex-col bg-[#FFFDF8] border border-[#D8C6AA] rounded-[20px] overflow-hidden transition-shadow duration-200 hover:shadow-elevated"
    >
      {/* Unified 4:5 Archive Frame */}
      {useDemoModalCallback ? (
        <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE3D1]">
          {primaryMedia && (
            <ImageWithFallback
              src={primaryMedia.url}
              alt={primaryMedia.alt[lang]}
              dominantColor={primaryMedia.dominantColor}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          )}

          {/* Top inline-start ID Stamp */}
          <div className="absolute top-3 start-3 z-10">
            <RegisterStamp listingId={dog.listingId} variant="overlay" />
          </div>

          {/* Top inline-end Availability Badge */}
          <div className="absolute top-3 end-3 z-10">
            <AvailabilityBadge availability={dog.availability} />
          </div>
        </div>
      ) : (
        <Link
          to={detailPath}
          aria-label={`${dog.breed[lang]} — ${dog.listingId}`}
          className="relative aspect-[4/5] overflow-hidden bg-[#EDE3D1] block"
        >
          {primaryMedia && (
            <ImageWithFallback
              src={primaryMedia.url}
              alt={primaryMedia.alt[lang]}
              dominantColor={primaryMedia.dominantColor}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          )}

          {/* Top inline-start ID Stamp */}
          <div className="absolute top-3 start-3 z-10">
            <RegisterStamp listingId={dog.listingId} variant="overlay" />
          </div>

          {/* Top inline-end Availability Badge */}
          <div className="absolute top-3 end-3 z-10">
            <AvailabilityBadge availability={dog.availability} />
          </div>
        </Link>
      )}

      {/* Explicit Demo Notice Band — mandatory per project rules */}
      {dog.isDemo && (
        <div className="px-4 py-2.5 bg-[#EDE3D1] border-b border-[#D8C6AA] text-[14px] font-medium text-[#8E5F3C]">
          <span>{t.demo.bannerShort}</span>
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 gap-3.5">
        <div className="space-y-1.5">
          <h3
            className={`text-[21px] leading-[1.3] font-semibold text-[#1E2A23] ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {useDemoModalCallback ? (
              dog.breed[lang]
            ) : (
              <Link
                to={detailPath}
                className="hover:text-[#263B30] underline-offset-4 hover:underline"
              >
                {dog.breed[lang]}
              </Link>
            )}
          </h3>

          {/* Clean unboxed metadata with typographic separators */}
          <p className="text-[15px] text-[#55634B] flex flex-wrap items-center gap-1.5">
            <span>{ageText}</span>
            <span aria-hidden="true">·</span>
            <span>{genderText}</span>
            {sizeText && (
              <>
                <span aria-hidden="true">·</span>
                <span>{sizeText}</span>
              </>
            )}
          </p>
        </div>

        <div className="text-[15px] font-medium text-[#263B30] tabular-nums">
          {priceText}
        </div>

        {/* Compact honest single-line summary for archive cards; default badge list otherwise */}
        {compactDocSummary && vaccinationAssessment ? (
          <div className="pt-0.5">
            {vaccinationAssessment.state === 'verified_with_record' ? (
              <DocStatusBadge
                status="verified"
                label={
                  vaccinationAssessment.isDemoSample
                    ? t.archive.docCompact.verified_demo
                    : t.archive.docCompact.verified_real
                }
              />
            ) : vaccinationAssessment.state === 'partial_record' ? (
              <DocStatusBadge
                status="partially_documented"
                label={t.archive.docCompact.partial}
              />
            ) : (
              <DocStatusBadge
                status="not_documented"
                label={t.archive.docCompact.none}
              />
            )}
          </div>
        ) : (
          docBadges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {docBadges.map((doc) => (
                <DocStatusBadge
                  key={doc.key}
                  status={doc.status}
                  label={`${t.card.docShort[doc.key]}: ${t.card.statusLabel[doc.status]}`}
                />
              ))}
            </div>
          )
        )}

        <div className="mt-auto pt-2">
          {useDemoModalCallback && onSelectDemo ? (
            <button
              type="button"
              onClick={() => onSelectDemo(dog)}
              className="w-full min-h-[46px] px-4 py-2.5 rounded-[12px] border border-[#263B30] text-[15px] font-medium text-[#263B30] hover:bg-[#263B30] hover:text-[#F7F3EA] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.card.details}</span>
              <ArrowLeft
                className="w-4 h-4 ltr:rotate-180"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>
          ) : (
            <Link
              to={detailPath}
              data-testid={`dog-card-link-${dog.listingId}`}
              className="w-full min-h-[46px] px-4 py-2.5 rounded-[12px] border border-[#263B30] text-[15px] font-medium text-[#263B30] hover:bg-[#263B30] hover:text-[#F7F3EA] transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>{t.card.details}</span>
              <ArrowLeft
                className="w-4 h-4 ltr:rotate-180"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
