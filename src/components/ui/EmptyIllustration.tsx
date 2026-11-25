import React from 'react';

export function EmptyIllustration({
  kind,
  className = 'w-20 h-20',
}: {
  kind: 'search' | 'cart' | 'not-found';
  className?: string;
}) {
  if (kind === 'cart') {
    return (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M16 24H64L59 58H21L16 24Z"
          stroke="#718066"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29 24V20C29 14.5 33.9 10 40 10C46.1 10 51 14.5 51 20V24"
          stroke="#718066"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="40" cy="41" r="6" stroke="#B7835B" strokeWidth="1.5" strokeDasharray="2 3" />
      </svg>
    );
  }

  if (kind === 'not-found') {
    return (
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <circle cx="40" cy="40" r="28" stroke="#718066" strokeWidth="1.5" strokeDasharray="3 4" />
        <path
          d="M28 48C31.2 43.8 35.3 42 40 42C44.7 42 48.8 43.8 52 48"
          stroke="#263B30"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="33" r="2" fill="#263B30" />
        <circle cx="48" cy="33" r="2" fill="#263B30" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="36" cy="36" r="19" stroke="#718066" strokeWidth="1.5" />
      <path d="M50 50L65 65" stroke="#263B30" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29 36H43" stroke="#B7835B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
