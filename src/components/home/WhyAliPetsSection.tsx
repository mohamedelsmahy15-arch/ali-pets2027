import React from 'react';
import { SectionHeader } from '@/src/components/layout/SectionHeader';
import { useLanguage } from '@/src/context/LanguageContext';

export function WhyAliPetsSection() {
  const { lang, t } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <section className="py-14 md:py-20 bg-[#263B30] text-[#F7F3EA] on-dark">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={t.why.eyebrow}
          title={t.why.title}
          onDark
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-2">
          {t.why.items.map((item) => (
            <div
              key={item.num}
              className="pt-6 border-t border-[#D8C6AA]/25 space-y-3"
            >
              <span
                dir="ltr"
                className="block font-display-en text-[40px] md:text-[48px] font-normal leading-none text-[#B7835B] tabular-nums"
              >
                {item.num}
              </span>
              <h3 className={`${displayFont} text-[20px] md:text-[22px] font-semibold leading-[1.35] text-[#F7F3EA]`}>
                {item.title}
              </h3>
              <p className="text-[16px] leading-[1.7] text-[#EDE3D1]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
