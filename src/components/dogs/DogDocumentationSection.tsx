import React, { useState } from 'react';
import { BookOpen, Eye, FileText, ShieldCheck, Syringe } from 'lucide-react';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { Modal } from '@/src/components/ui/Modal';
import { DocStatusBadge } from '@/src/components/ui/StatusBadge';
import { useLanguage } from '@/src/context/LanguageContext';
import type { DocumentationItem, DogListing } from '@/src/types';
import { getDocumentationBreakdown, getEffectiveDocStatus } from '@/src/utils/dogFilter';

interface DogDocumentationSectionProps {
  dog: DogListing;
}

const DOC_ICONS: Record<DocumentationItem['key'], React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>> = {
  vaccination: Syringe,
  deworming: ShieldCheck,
  health_booklet: BookOpen,
  pedigree: FileText,
};

export function DogDocumentationSection({ dog }: DogDocumentationSectionProps) {
  const { lang, t } = useLanguage();
  const [previewDoc, setPreviewDoc] = useState<{
    title: string;
    imageUrl: string;
  } | null>(null);

  const applicableItems = dog.documentation.filter((item) => item.applicable !== false);
  const breakdown = getDocumentationBreakdown(dog);
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <section
      aria-labelledby="dog-paperwork-heading"
      className="bg-[#FFFDF8] border border-[#D8C6AA] rounded-[24px] p-5 sm:p-7 md:p-8 space-y-6"
    >
      {/* Section Header with Honest Proof-Based Breakdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#D8C6AA]/70">
        <div className="space-y-1.5">
          <h2 id="dog-paperwork-heading" className={`${displayFont} type-section-h2 text-[#263B30]`}>
            {t.detail.docsTitle}
          </h2>
          <p className="text-[15px] text-[#55634B] tabular-nums flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#263B30]">
              {t.detail.docsProofCount(breakdown.verifiedWithProofCount, breakdown.totalApplicable)}
            </span>
            {breakdown.partialCount > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span>{t.detail.docsPartialCount(breakdown.partialCount)}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Explicit Demo Notice inside Paperwork Section */}
      {dog.isDemo && (
        <div className="px-4 py-3 rounded-[12px] bg-[#EDE3D1]/80 border border-[#D8C6AA] text-[14px] md:text-[15px] font-medium text-[#8E5F3C]">
          {t.detail.docsDemoDisclaimer}
        </div>
      )}

      {/* Independent Rows / Cards per Document Item */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {applicableItems.map((item) => {
          const Icon = DOC_ICONS[item.key];
          const effectiveStatus = getEffectiveDocStatus(item);
          const itemTitle = t.card.docShort[item.key];
          const detailText = item.details?.[lang]?.trim() || null;
          const sourceText = item.sourceName?.trim() || null;
          const dateText = item.documentDate?.trim() || null;
          const firstDocImage =
            Array.isArray(item.documentImages) && item.documentImages.length > 0
              ? item.documentImages[0]
              : null;

          return (
            <article
              key={item.key}
              className="flex flex-col justify-between gap-4 p-5 rounded-[16px] bg-[#F7F3EA]/75 border border-[#D8C6AA]"
            >
              <div className="space-y-3">
                {/* Row Top: Icon + Document Title + Semantic Status */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-[10px] bg-[#EDE3D1] border border-[#D8C6AA] text-[#263B30] inline-flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" strokeWidth={1.7} aria-hidden={true} />
                    </span>
                    <h3 className="text-[17px] font-semibold text-[#1E2A23]">
                      {itemTitle}
                    </h3>
                  </div>

                  <DocStatusBadge
                    status={effectiveStatus}
                    label={t.card.statusLabel[effectiveStatus]}
                    className="text-[14px] px-2.5 py-1"
                  />
                </div>

                {/* Details note if present */}
                {detailText && (
                  <p className="text-[15px] leading-[1.6] text-[#1E2A23]">
                    {detailText}
                  </p>
                )}

                {/* Structured Source & Date metadata (>= 14px) */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[14px]">
                  <div className="flex items-baseline gap-1.5">
                    <dt className="text-[#55634B] shrink-0">{t.detail.docSourceLabel}:</dt>
                    <dd className="font-medium text-[#1E2A23]">
                      {sourceText ?? t.detail.notRecorded}
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <dt className="text-[#55634B] shrink-0">{t.detail.docDateLabel}:</dt>
                    <dd className="font-medium text-[#1E2A23] tabular-nums">
                      {dateText ?? t.detail.notRecorded}
                    </dd>
                  </div>
                </dl>
              </div>

              {firstDocImage && (
                <div className="pt-2 border-t border-[#D8C6AA]/60">
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewDoc({
                        title: itemTitle,
                        imageUrl: firstDocImage,
                      })
                    }
                    className="inline-flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-[10px] border border-[#263B30]/40 bg-[#FFFDF8] text-[14px] font-medium text-[#263B30] hover:bg-[#EDE3D1] transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                    <span>{t.detail.docViewSampleImage}</span>
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Document Image Lightbox Modal */}
      <Modal
        open={Boolean(previewDoc)}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc ? `${previewDoc.title} — ${dog.listingId}` : ''}
      >
        {previewDoc && (
          <div className="space-y-4">
            {dog.isDemo && (
              <div className="px-4 py-2.5 rounded-[10px] bg-[#EDE3D1] border border-[#D8C6AA] text-[14px] font-medium text-[#8E5F3C]">
                {t.detail.docSamplePreviewNote}
              </div>
            )}
            <div className="rounded-[16px] overflow-hidden border border-[#D8C6AA] bg-[#EDE3D1] max-h-[60svh] flex items-center justify-center">
              <ImageWithFallback
                src={previewDoc.imageUrl}
                alt={`${previewDoc.title} — ${dog.listingId}`}
                dominantColor="#EDE3D1"
                className="max-h-[60svh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
