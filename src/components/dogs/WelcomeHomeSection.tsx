import React from 'react';
import { Check, Plus, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { useLanguage } from '@/src/context/LanguageContext';
import type { DogListing } from '@/src/types';
import { getWelcomeHomeRecommendations } from '@/src/utils/welcomeHome';

interface WelcomeHomeSectionProps {
  dog: DogListing;
  selectedIds: string[];
  skipped: boolean;
  onToggleItem: (id: string) => void;
  onSkip: () => void;
  onRestore: () => void;
  onOpenInquiry: () => void;
}

export function WelcomeHomeSection({
  dog,
  selectedIds,
  skipped,
  onToggleItem,
  onSkip,
  onRestore,
  onOpenInquiry,
}: WelcomeHomeSectionProps) {
  const { lang, t } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';
  const result = getWelcomeHomeRecommendations(dog);
  const isSold = dog.availability === 'sold';

  if (result.recommendations.length === 0) {
    return null;
  }

  if (skipped) {
    return (
      <section
        data-testid="welcome-home-skipped"
        aria-label={t.welcomeHome.title}
        className="p-5 sm:p-6 rounded-[20px] bg-[#FFFDF8] border border-[#D8C6AA] flex flex-wrap items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <h2 className={`${displayFont} text-[19px] font-semibold text-[#263B30]`}>
            {t.welcomeHome.skippedTitle}
          </h2>
          <p className="text-[15px] text-[#55634B]">{t.welcomeHome.skippedBody}</p>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onRestore}
          data-testid="welcome-home-restore-btn"
        >
          <span className="inline-flex items-center gap-2">
            <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.welcomeHome.restoreSection}</span>
          </span>
        </Button>
      </section>
    );
  }

  return (
    <section
      data-testid="welcome-home-section"
      aria-labelledby="welcome-home-heading"
      className="p-5 sm:p-7 md:p-8 rounded-[24px] bg-[#FFFDF8] border border-[#D8C6AA] space-y-6"
    >
      {/* Header Row with Optional Skip */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#D8C6AA]/70">
        <div className="space-y-2 max-w-2xl">
          <p className="text-[13px] font-medium text-[#718066]">
            {t.welcomeHome.eyebrow}
          </p>
          <h2
            id="welcome-home-heading"
            className={`${displayFont} type-section-h2 text-[#263B30]`}
          >
            {t.welcomeHome.title}
          </h2>
          <p
            data-testid="welcome-home-subtitle"
            className="text-[15px] md:text-[16px] leading-[1.65] text-[#55634B]"
          >
            {t.welcomeHome.subtitles[result.basisSummary]}
          </p>
        </div>

        <button
          type="button"
          onClick={onSkip}
          data-testid="welcome-home-skip-btn"
          className="self-start md:self-auto min-h-[44px] px-4 py-2 rounded-[12px] border border-[#D8C6AA] bg-[#F7F3EA] text-[14px] font-medium text-[#55634B] hover:text-[#263B30] hover:border-[#263B30]/50 transition-colors inline-flex items-center gap-2 cursor-pointer shrink-0"
        >
          <SkipForward className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{t.welcomeHome.skipSection}</span>
        </button>
      </div>

      {/* Maximum 3 Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {result.recommendations.map((rec) => {
          const isSelected = selectedIds.includes(rec.item.id);
          return (
            <article
              key={rec.item.id}
              data-testid={`welcome-home-card-${rec.item.id}`}
              className={`flex flex-col rounded-[18px] border overflow-hidden transition-colors ${
                isSelected
                  ? 'bg-[#F7F3EA] border-[#263B30]'
                  : 'bg-[#F7F3EA]/70 border-[#D8C6AA]'
              }`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDE3D1] border-b border-[#D8C6AA]/60">
                <ImageWithFallback
                  src={rec.item.imageUrl}
                  alt={rec.item.alt[lang]}
                  dominantColor={rec.item.dominantColor}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
                <div className="space-y-1.5">
                  <p className="text-[13px] text-[#55634B] flex flex-wrap items-center gap-1.5">
                    <span>{rec.item.categoryLabel[lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#8E5F3C] font-medium">
                      {t.welcomeHome.demoCaption}
                    </span>
                  </p>
                  <h3 className="text-[17px] font-semibold text-[#1E2A23] leading-snug">
                    {rec.item.name[lang]}
                  </h3>
                </div>

                <p className="text-[14px] leading-[1.65] text-[#55634B]">
                  {rec.reason[lang]}
                </p>

                <div className="mt-auto pt-2">
                  <button
                    type="button"
                    disabled={isSold}
                    aria-pressed={isSelected}
                    onClick={() => onToggleItem(rec.item.id)}
                    data-testid={`welcome-home-toggle-${rec.item.id}`}
                    className={`w-full min-h-[46px] px-4 py-2.5 rounded-[12px] border text-[14px] font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${
                      isSelected
                        ? 'bg-[#263B30] text-[#F7F3EA] border-[#263B30] hover:bg-[#1B2A22]'
                        : 'bg-[#FFFDF8] text-[#263B30] border-[#263B30] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{t.welcomeHome.selectedItem}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{t.welcomeHome.selectItem}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Calm Reassurance & Synchronized Inquiry Trigger */}
      <div className="pt-4 border-t border-[#D8C6AA]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-[14px] leading-[1.6] text-[#55634B]">
          {t.welcomeHome.reassuranceNote}
        </p>

        {!isSold && selectedIds.length > 0 && (
          <Button
            type="button"
            variant={dog.isDemo ? 'secondary' : 'whatsapp'}
            onClick={onOpenInquiry}
            data-testid="welcome-home-inquire-btn"
            className="shrink-0"
          >
            {t.welcomeHome.askWithDogCta(selectedIds.length)}
          </Button>
        )}
      </div>
    </section>
  );
}
