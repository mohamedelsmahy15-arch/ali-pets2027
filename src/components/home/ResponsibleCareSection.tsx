import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { useLanguage } from '@/src/context/LanguageContext';
import { BRAND_ASSETS } from '@/src/data/assets';

export function ResponsibleCareSection() {
  const { lang, t, localizedPath } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <section className="py-14 md:py-20 bg-[#F7F3EA]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Image A11 (corrected from A09) */}
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] rounded-[20px] overflow-hidden border border-[#D8C6AA] bg-[#EDE3D1]">
            <ImageWithFallback
              src={BRAND_ASSETS.responsibleCare.url}
              alt={BRAND_ASSETS.responsibleCare.alt[lang]}
              dominantColor={BRAND_ASSETS.responsibleCare.dominantColor}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Copy & 3 general ownership principles */}
        <div className="lg:col-span-7 space-y-6">
          <p
            className={`text-[14px] font-medium text-[#55634B] ${
              lang === 'en' ? 'uppercase tracking-[0.12em]' : ''
            }`}
          >
            {t.careSection.eyebrow}
          </p>

          <h2 className={`${displayFont} type-section-h2 text-[#1E2A23] text-balance`}>
            {t.careSection.title}
          </h2>

          <ul className="space-y-4 pt-2">
            {t.careSection.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full bg-[#263B30]/10 text-[#263B30] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="text-[16px] md:text-[17px] leading-[1.65] text-[#1E2A23]">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-3">
            <Button to={localizedPath('/care')} variant="secondary" withArrow>
              {t.careSection.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
