import React from 'react';
import type { DocStatus, DogAvailability } from '@/src/types';
import { useLanguage } from '@/src/context/LanguageContext';

export function RegisterStamp({
  listingId,
  variant = 'inline',
  className = '',
}: {
  listingId: string;
  variant?: 'overlay' | 'inline';
  className?: string;
}) {
  const base =
    variant === 'overlay'
      ? 'bg-[#FFFDF8]/92 text-[#263B30] border border-[#D8C6AA] backdrop-blur-sm px-2.5 py-1 rounded-[4px] text-[12px]'
      : 'bg-[#EDE3D1] text-[#263B30] border border-[#D8C6AA] px-2.5 py-1 rounded-[4px] text-[12px]';

  return (
    <span className={`inline-flex items-center font-mono-code font-medium tracking-wider ${base} ${className}`}>
      <bdi dir="ltr">{listingId}</bdi>
    </span>
  );
}

export function AvailabilityBadge({
  availability,
  className = '',
}: {
  availability: DogAvailability;
  className?: string;
}) {
  const { t } = useLanguage();

  if (availability === 'sold') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[12px] font-medium bg-[#EDE3D1] text-[#7A7467] border border-[#D8C6AA] ${className}`}
      >
        <span>{t.card.sold}</span>
      </span>
    );
  }

  if (availability === 'reserved') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[12px] font-medium bg-[#FFFDF8]/95 text-[#8E5F3C] border border-[#8E5F3C]/35 ${className}`}
      >
        <svg viewBox="0 0 12 12" className="w-3 h-3 shrink-0" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="4.5" stroke="#8E5F3C" strokeWidth="1.5" />
          <path d="M6 3.5V6.2L7.8 7.4" stroke="#8E5F3C" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span>{t.card.reserved}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[12px] font-medium bg-[#263B30] text-[#F7F3EA] ${className}`}
    >
      <svg viewBox="0 0 12 12" className="w-3 h-3 shrink-0" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" stroke="#F7F3EA" strokeWidth="1.4" />
        <path d="M4 6.1L5.4 7.5L8.2 4.6" stroke="#F7F3EA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{t.card.available}</span>
    </span>
  );
}

export function DocStatusIcon({ status }: { status: DocStatus }) {
  if (status === 'verified') {
    return (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="#2F6B4F" strokeWidth="1.5" />
        <path
          d="M5.2 8.2L7.1 10.1L10.9 6.1"
          stroke="#2F6B4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (status === 'partially_documented') {
    return (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="#8E5F3C" strokeWidth="1.5" />
        <path d="M8 1.5A6.5 6.5 0 0 0 8 14.5Z" fill="#8E5F3C" />
      </svg>
    );
  }

  if (status === 'not_documented') {
    return (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="#7A7467" strokeWidth="1.5" />
      </svg>
    );
  }

  // not_provided
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="#7A7467" strokeWidth="1.5" strokeDasharray="2.5 2.5" />
    </svg>
  );
}

export function DocStatusBadge({
  status,
  label,
  className = '',
}: {
  status: DocStatus;
  label: string;
  className?: string;
}) {
  const colorMap: Record<DocStatus, string> = {
    verified: 'text-[#2F6B4F] border-[#2F6B4F]/35 bg-[#2F6B4F]/8',
    partially_documented: 'text-[#8E5F3C] border-[#8E5F3C]/35 bg-[#8E5F3C]/8',
    not_documented: 'text-[#55634B] border-[#D8C6AA] bg-[#FFFDF8]',
    not_provided: 'text-[#55634B] border-[#D8C6AA] bg-[#FFFDF8]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] border text-[12px] font-medium ${colorMap[status]} ${className}`}
    >
      <DocStatusIcon status={status} />
      <span>{label}</span>
    </span>
  );
}
