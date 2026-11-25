import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/src/context/LanguageContext';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkLabel?: string;
  onDark?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  linkTo,
  linkLabel,
  onDark = false,
  headingLevel = 'h2',
}: SectionHeaderProps) {
  const { lang } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  const headingClasses =
    headingLevel === 'h3'
      ? `type-sub-h3 ${displayFont}`
      : `type-section-h2 ${displayFont}`;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
      <div className="max-w-2xl space-y-2.5">
        {eyebrow && (
          <p
            className={`text-[14px] font-medium ${
              lang === 'en' ? 'uppercase tracking-[0.12em]' : ''
            } ${onDark ? 'text-[#D8C6AA]' : 'text-[#55634B]'}`}
          >
            {eyebrow}
          </p>
        )}
        {headingLevel === 'h3' ? (
          <h3 className={`${headingClasses} ${onDark ? 'text-[#F7F3EA]' : 'text-[#1E2A23]'} text-balance`}>
            {title}
          </h3>
        ) : (
          <h2 className={`${headingClasses} ${onDark ? 'text-[#F7F3EA]' : 'text-[#1E2A23]'} text-balance`}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className={`text-[16px] md:text-[17px] leading-[1.68] ${onDark ? 'text-[#EDE3D1]' : 'text-[#55634B]'}`}>
            {subtitle}
          </p>
        )}
      </div>

      {linkTo && linkLabel && (
        <Link
          to={linkTo}
          className={`group inline-flex items-center gap-2 text-[15px] font-medium whitespace-nowrap shrink-0 py-2 min-h-[44px] ${
            onDark
              ? 'text-[#F7F3EA] hover:text-[#D8C6AA]'
              : 'text-[#263B30] hover:text-[#1B2A22]'
          }`}
        >
          <span className="border-b border-current pb-0.5">{linkLabel}</span>
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-200 ltr:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
