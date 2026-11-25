import React from 'react';
import { Button } from '@/src/components/ui/Button';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { useLanguage } from '@/src/context/LanguageContext';
import { BRAND_ASSETS } from '@/src/data/assets';

export function HeroSection() {
  const { lang, t, localizedPath } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <section className="bg-[#263B30] text-[#F7F3EA] on-dark pt-[64px] md:pt-[72px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Clean, unobstructed dog photograph */}
          <div className="lg:order-2 lg:col-span-6">
            <div className="aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/4.3] max-h-[540px] w-full rounded-[24px] overflow-hidden border border-[#D8C6AA]/25 bg-[#1B2A22]">
              <ImageWithFallback
                src={BRAND_ASSETS.hero.url}
                alt={BRAND_ASSETS.hero.alt[lang]}
                dominantColor={BRAND_ASSETS.hero.dominantColor}
                priority
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Direct Storefront Proposition & Immediate Actions */}
          <div className="lg:order-1 lg:col-span-6 space-y-5 md:space-y-6">
            <p
              className={`text-[14px] font-medium text-[#D8C6AA] ${
                lang === 'en' ? 'uppercase tracking-[0.12em]' : ''
              }`}
            >
              {t.hero.eyebrow}
            </p>

            <h1 className={`${displayFont} type-hero text-[#F7F3EA] text-balance`}>
              {t.hero.headline}
            </h1>

            <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#EDE3D1] max-w-[48ch]">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button
                to={localizedPath('/dogs')}
                variant="primary"
                onDark
                size="lg"
                withArrow
                className="w-full sm:w-auto"
              >
                {t.hero.primaryCta}
              </Button>
              <Button
                to={localizedPath('/accessories')}
                variant="secondary"
                onDark
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.hero.secondaryCta}
              </Button>
            </div>

            <div className="pt-4 border-t border-[#D8C6AA]/20 space-y-2">
              <p className="text-[14px] font-medium text-[#F7F3EA]">
                {t.hero.quickAssurance}
              </p>
              <p className="text-[14px] leading-[1.6] text-[#D8C6AA]">
                {t.demo.siteNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
