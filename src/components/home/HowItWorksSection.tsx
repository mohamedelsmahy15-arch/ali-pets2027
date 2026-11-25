import React from 'react';
import { SectionHeader } from '@/src/components/layout/SectionHeader';
import { useLanguage } from '@/src/context/LanguageContext';

export function HowItWorksSection() {
  const { lang, t } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <section
      id="how-it-works"
      className="py-14 md:py-20 bg-[#FFFDF8] border-t border-[#D8C6AA]/60 scroll-mt-[80px]"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={t.howItWorks.eyebrow}
          title={t.howItWorks.title}
        />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {t.howItWorks.steps.map((step) => (
            <li
              key={step.num}
              className="p-5 md:p-6 rounded-[16px] bg-[#F7F3EA] border border-[#D8C6AA] space-y-2.5"
            >
              <span
                dir="ltr"
                className="inline-block font-mono-code text-[14px] font-medium text-[#8E5F3C] tabular-nums"
              >
                {step.num}
              </span>
              <h3 className={`${displayFont} text-[20px] font-semibold leading-[1.35] text-[#1E2A23]`}>
                {step.title}
              </h3>
              <p className="text-[16px] leading-[1.68] text-[#55634B]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
