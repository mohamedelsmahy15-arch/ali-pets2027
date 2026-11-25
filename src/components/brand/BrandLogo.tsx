import React from 'react';

export type BrandLogoVariant = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
export type BrandLogoTone = 'forest' | 'ivory';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  tone?: BrandLogoTone;
  className?: string;
  size?: number;
}

/**
 * Single continuous stroke paw mark on a 64x64 grid:
 * flat heart-shaped main pad + 4 tilted oval toes, 3.5 strokeWidth, round caps,
 * subtle 2-unit opening gap for hand-drawn register character.
 */
export function PawMarkSvg({
  className = 'w-8 h-8',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15.5 34.5c-3.1-.9-5.6 1.5-5.2 4.8.4 3.3 3.4 5.9 6.5 5.4 2.8-.4 4.3-3.4 3.3-6.4M20.8 25.2c-2.5-2.6-1.7-6.9 1.4-8.5 3.1-1.6 6.7.3 7.3 3.9.5 3.1-1.7 5.9-4.7 6.1M33.2 21.8c-.4-3.7 2.2-7.1 5.6-7.1 3.4 0 6 3.4 5.5 7.1-.4 3.1-2.8 5.2-5.6 5.2M46.1 27.6c1.9-3.1 5.7-4.4 8.4-2.5 2.7 1.9 2.7 6.2.1 8.8-2.2 2.2-5.5 2.2-7.6.4M43.2 42.6c1.7 4.4-1.3 9.4-6.1 9.4-2.2 0-3.6-.9-5.1-.9s-2.9.9-5.1.9c-4.7 0-7.8-4.7-6.2-9.2 1.8-5.2 6.2-8.8 11.3-8.8 4.4 0 8.2 2.6 10.3 6.7"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Wordmark in Fraunces 600, uppercase, +0.18em tracking,
 * featuring the signature apex-ligature 'A' without a horizontal crossbar.
 */
function Wordmark({
  color,
  sizeClass = 'text-[17px]',
}: {
  color: string;
  sizeClass?: string;
}) {
  return (
    <span
      dir="ltr"
      className={`inline-flex items-baseline font-display-en font-semibold uppercase tracking-[0.18em] leading-none select-none whitespace-nowrap ${sizeClass}`}
      style={{ color }}
    >
      <svg
        viewBox="0 0 18 20"
        className="h-[0.82em] w-auto me-[0.12em] translate-y-[0.02em]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 18.2L9 2.2L15.5 18.2"
          stroke={color}
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 18.2H4.3M13.7 18.2H17"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span>LI PETS</span>
    </span>
  );
}

export function BrandLogo({
  variant = 'L1',
  tone = 'forest',
  className = '',
  size = 56,
}: BrandLogoProps) {
  const color = tone === 'ivory' ? '#F7F3EA' : '#263B30';

  if (variant === 'L3') {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <PawMarkSvg className="w-7 h-7" color={color} />
      </span>
    );
  }

  if (variant === 'L4') {
    return (
      <span className={`inline-flex items-center min-w-[96px] ${className}`}>
        <Wordmark color={color} />
      </span>
    );
  }

  if (variant === 'L2') {
    return (
      <span
        className={`inline-flex flex-col items-center justify-center gap-2 min-w-[72px] ${className}`}
      >
        <PawMarkSvg className="w-9 h-9" color={color} />
        <Wordmark color={color} sizeClass="text-[15px]" />
      </span>
    );
  }

  if (variant === 'L5') {
    const sealSize = Math.max(48, size);
    const id = `ali-seal-${tone}`;
    return (
      <svg
        width={sealSize}
        height={sealSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <path
            id={id}
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <circle cx="60" cy="60" r="56" stroke={color} strokeWidth="1.2" />
        <circle cx="60" cy="60" r="32" stroke={color} strokeWidth="0.9" strokeDasharray="2 3" />
        <text
          fill={color}
          fontSize="7.4"
          fontFamily="IBM Plex Mono, monospace"
          fontWeight="500"
          letterSpacing="2.3"
        >
          <textPath href={`#${id}`} startOffset="2%">
            ALI PETS · ALEXANDRIA · EGYPT ·
          </textPath>
        </text>
        <g transform="translate(38, 38) scale(0.68)">
          <path
            d="M15.5 34.5c-3.1-.9-5.6 1.5-5.2 4.8.4 3.3 3.4 5.9 6.5 5.4 2.8-.4 4.3-3.4 3.3-6.4M20.8 25.2c-2.5-2.6-1.7-6.9 1.4-8.5 3.1-1.6 6.7.3 7.3 3.9.5 3.1-1.7 5.9-4.7 6.1M33.2 21.8c-.4-3.7 2.2-7.1 5.6-7.1 3.4 0 6 3.4 5.5 7.1-.4 3.1-2.8 5.2-5.6 5.2M46.1 27.6c1.9-3.1 5.7-4.4 8.4-2.5 2.7 1.9 2.7 6.2.1 8.8-2.2 2.2-5.5 2.2-7.6.4M43.2 42.6c1.7 4.4-1.3 9.4-6.1 9.4-2.2 0-3.6-.9-5.1-.9s-2.9.9-5.1.9c-4.7 0-7.8-4.7-6.2-9.2 1.8-5.2 6.2-8.8 11.3-8.8 4.4 0 8.2 2.6 10.3 6.7"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  }

  // L1 Horizontal
  return (
    <span className={`inline-flex items-center gap-2.5 min-w-[120px] shrink-0 ${className}`}>
      <PawMarkSvg className="w-7 h-7 shrink-0" color={color} />
      <Wordmark color={color} />
    </span>
  );
}
