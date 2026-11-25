import React, { useState } from 'react';
import { PawMarkSvg } from '@/src/components/brand/BrandLogo';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  dominantColor?: string;
  className?: string;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  dominantColor = '#EDE3D1',
  className = '',
  priority = false,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-center ${className}`}
        style={{ backgroundColor: dominantColor }}
        role="img"
        aria-label={alt}
      >
        <PawMarkSvg className="w-10 h-10 opacity-40 text-[#263B30]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={className}
      style={{ backgroundColor: dominantColor }}
    />
  );
}
