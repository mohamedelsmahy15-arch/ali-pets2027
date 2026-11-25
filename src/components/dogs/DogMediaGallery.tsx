import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { useLanguage } from '@/src/context/LanguageContext';
import type { DogMedia } from '@/src/types';

interface DogMediaGalleryProps {
  media: DogMedia[];
  breedName: string;
  isDemo: boolean;
}

export function DogMediaGallery({ media, breedName, isDemo }: DogMediaGalleryProps) {
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeMedia = media.length > 0 ? media : [];
  const boundedIndex = activeIndex < safeMedia.length ? activeIndex : 0;
  const activeItem = safeMedia[boundedIndex];
  const hasMultiple = safeMedia.length > 1;

  // Reset index when switching between different dog listings
  useEffect(() => {
    setActiveIndex(0);
    setLightboxOpen(false);
  }, [breedName, safeMedia.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (hasMultiple && e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % safeMedia.length);
      } else if (hasMultiple && e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + safeMedia.length) % safeMedia.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxOpen, hasMultiple, safeMedia.length]);

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + safeMedia.length) % safeMedia.length);
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % safeMedia.length);

  return (
    <div className="space-y-4">
      {/* Main Prominent Media Frame */}
      <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden border border-[#D8C6AA] bg-[#EDE3D1] shadow-elevated">
        {activeItem ? (
          activeItem.type === 'video' ? (
            <video
              src={activeItem.url}
              controls
              playsInline
              aria-label={activeItem.alt[lang]}
              className="w-full h-full object-cover bg-[#1B2A22]"
            />
          ) : (
            <>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`${t.detail.zoomImage} — ${breedName}`}
                className="group block w-full h-full text-start cursor-zoom-in focus-visible:outline-none"
              >
                <ImageWithFallback
                  src={activeItem.url}
                  alt={activeItem.alt[lang]}
                  dominantColor={activeItem.dominantColor}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </button>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={t.detail.zoomImage}
                className="absolute bottom-4 end-4 min-w-[44px] min-h-[44px] px-3 py-2 rounded-[12px] bg-[#FFFDF8]/92 border border-[#D8C6AA] text-[#263B30] hover:bg-[#FFFDF8] text-[14px] font-medium inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                <span>{t.detail.zoomImage}</span>
              </button>
            </>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-center text-[15px] text-[#55634B]">
            {t.detail.notRecorded}
          </div>
        )}
      </div>

      {/* Adaptive Thumbnails — rendered only when 2+ media items exist */}
      {hasMultiple && (
        <div
          className="flex items-center gap-3 overflow-x-auto pb-1"
          role="list"
          aria-label={breedName}
        >
          {safeMedia.map((item, idx) => {
            const isSelected = idx === boundedIndex;
            return (
              <button
                key={`${item.url}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-current={isSelected ? 'true' : undefined}
                aria-label={`${breedName} ${idx + 1}`}
                className={`w-20 aspect-square rounded-[12px] overflow-hidden border-2 shrink-0 bg-[#EDE3D1] transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#263B30] ring-2 ring-[#263B30]/20'
                    : 'border-[#D8C6AA] opacity-80 hover:opacity-100'
                }`}
              >
                <ImageWithFallback
                  src={item.url}
                  alt={item.alt[lang]}
                  dominantColor={item.dominantColor}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Viewer */}
      {lightboxOpen && activeItem && activeItem.type === 'image' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#1B2A22]/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${breedName} — ${t.detail.zoomImage}`}
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-[820px] flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 text-[#F7F3EA]">
              <p className="text-[15px] font-medium">
                {isDemo ? t.demo.bannerShort : breedName}
              </p>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label={t.detail.closeLightbox}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[12px] bg-[#FFFDF8]/15 hover:bg-[#FFFDF8]/25 text-[#F7F3EA] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="relative rounded-[20px] overflow-hidden border border-[#D8C6AA]/40 bg-[#1B2A22] max-h-[78svh] flex items-center justify-center">
              <ImageWithFallback
                src={activeItem.url}
                alt={activeItem.alt[lang]}
                dominantColor={activeItem.dominantColor}
                className="max-h-[78svh] w-auto max-w-full object-contain"
              />

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={t.detail.previousMedia}
                    className="absolute start-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-[#FFFDF8]/90 text-[#263B30] hover:bg-[#FFFDF8] inline-flex items-center justify-center shadow cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 ltr:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t.detail.nextMedia}
                    className="absolute end-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-[#FFFDF8]/90 text-[#263B30] hover:bg-[#FFFDF8] inline-flex items-center justify-center shadow cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 ltr:rotate-180" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
