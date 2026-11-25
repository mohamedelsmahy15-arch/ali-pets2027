import React from 'react';
import { Button } from '@/src/components/ui/Button';
import { EmptyIllustration } from '@/src/components/ui/EmptyIllustration';
import { useLanguage } from '@/src/context/LanguageContext';

interface PhaseStubPageProps {
  kind: 'dogs' | 'dog-detail' | 'accessories' | 'cart' | 'checkout' | 'care' | 'about' | 'legal' | 'not-found';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  phase?: '2' | '3' | 'none';
}

export function PhaseStubPage({
  kind,
  titleAr,
  titleEn,
  descAr,
  descEn,
  phase = '2',
}: PhaseStubPageProps) {
  const { lang, t, localizedPath } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  const illustrationKind =
    kind === 'cart' || kind === 'checkout' || kind === 'accessories'
      ? 'cart'
      : kind === 'not-found'
      ? 'not-found'
      : 'search';

  return (
    <section className="pt-[112px] md:pt-[140px] pb-20 md:pb-28 bg-[#F7F3EA] min-h-[70svh] flex items-center">
      <div className="max-w-[720px] mx-auto px-4 md:px-6 text-center space-y-6">
        <div className="flex justify-center">
          <EmptyIllustration kind={illustrationKind} className="w-20 h-20" />
        </div>

        {phase !== 'none' && (
          <p className="text-[13px] font-medium text-[#8E5F3C]">
            {phase === '2' ? t.stub.phase2Badge : t.stub.phase3Badge}
          </p>
        )}

        <h1 className={`${displayFont} text-[32px] md:text-[42px] font-semibold leading-[1.2] text-[#1E2A23] text-balance`}>
          {lang === 'ar' ? titleAr : titleEn}
        </h1>

        <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#55634B]">
          {lang === 'ar' ? descAr : descEn}
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Button to={localizedPath('/')} variant="primary" withArrow>
            {t.stub.backHome}
          </Button>
        </div>
      </div>
    </section>
  );
}
