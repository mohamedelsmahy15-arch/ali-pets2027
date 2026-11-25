import React from 'react';
import { BrandLogo } from '@/src/components/brand/BrandLogo';
import { Button } from '@/src/components/ui/Button';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { Modal } from '@/src/components/ui/Modal';
import {
  AvailabilityBadge,
  DocStatusBadge,
  RegisterStamp,
} from '@/src/components/ui/StatusBadge';
import { useLanguage } from '@/src/context/LanguageContext';
import type { DogListing } from '@/src/types';
import { getEffectiveDocStatus } from '@/src/utils/dogFilter';
import { getVerifiedDocumentationCount } from '@/src/utils/register';

interface DemoDogPreviewModalProps {
  dog: DogListing | null;
  onClose: () => void;
}

export function DemoDogPreviewModal({ dog, onClose }: DemoDogPreviewModalProps) {
  const { lang, t } = useLanguage();
  const docSummary = dog ? getVerifiedDocumentationCount(dog) : null;

  return (
    <Modal
      open={Boolean(dog)}
      onClose={onClose}
      title={dog ? `${dog.breed[lang]} — ${dog.listingId}` : ''}
    >
      {dog && (
        <div className="space-y-5">
          <div className="px-4 py-3 rounded-[12px] bg-[#EDE3D1] border border-[#D8C6AA] text-[14px] font-medium text-[#8E5F3C]">
            {t.demo.bannerShort}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-28 aspect-[4/5] rounded-[12px] overflow-hidden border border-[#D8C6AA] shrink-0 bg-[#EDE3D1]">
              {dog.media[0] && (
                <ImageWithFallback
                  src={dog.media[0].url}
                  alt={dog.media[0].alt[lang]}
                  dominantColor={dog.media[0].dominantColor}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <RegisterStamp listingId={dog.listingId} />
                <AvailabilityBadge availability={dog.availability} />
              </div>
              <p className="text-[14px] text-[#55634B]">
                {dog.ageLabel[lang]} · {t.card.gender[dog.gender]} · {dog.coatColor[lang]}
              </p>
              {dog.personality && (
                <p className="text-[14px] leading-[1.6] text-[#1E2A23]">
                  {dog.personality[lang]}
                </p>
              )}
            </div>
          </div>

          <div className="relative p-4 rounded-[16px] bg-[#F7F3EA] border border-[#D8C6AA] overflow-hidden space-y-3">
            <div className="pointer-events-none absolute -bottom-4 -end-4 opacity-[0.06]">
              <BrandLogo variant="L5" tone="forest" size={96} />
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-[15px] font-semibold text-[#263B30]">
                {lang === 'ar'
                  ? 'الحالة الصحية والأوراق (نموذج تجريبي)'
                  : 'Health & Paperwork (Demo)'}
              </span>
              {docSummary && (
                <span className="text-[14px] text-[#55634B] tabular-nums">
                  {lang === 'ar'
                    ? `${docSummary.verified} من ${docSummary.total} موثّق بورق`
                    : `${docSummary.verified} of ${docSummary.total} verified`}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {dog.documentation
                .filter((item) => item.applicable !== false)
                .map((item) => {
                  const effectiveStatus = getEffectiveDocStatus(item);
                  return (
                    <div
                      key={item.key}
                      className="flex flex-wrap items-center justify-between gap-2 py-1.5 border-b border-[#D8C6AA]/50 last:border-none"
                    >
                      <span className="text-[14px] font-medium text-[#1E2A23]">
                        {t.card.docShort[item.key]}
                      </span>
                      <DocStatusBadge
                        status={effectiveStatus}
                        label={t.card.statusLabel[effectiveStatus]}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-[14px] leading-[1.65] text-[#55634B]">
              {t.demo.inquiryBlockedBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" disabled className="flex-1">
                {lang === 'ar'
                  ? 'الطلب مقفول للنماذج التجريبية (للتجربة بس)'
                  : 'Sales Inquiry Disabled for Demo'}
              </Button>
              <Button variant="primary" onClick={onClose}>
                {t.demo.understandClose}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
