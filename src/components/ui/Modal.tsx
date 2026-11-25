import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/src/context/LanguageContext';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const { lang } = useLanguage();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-[#263B30]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ali-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-[560px] max-h-[90svh] overflow-y-auto bg-[#FFFDF8] border border-[#D8C6AA] rounded-t-[20px] md:rounded-[20px] shadow-elevated p-6 md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#D8C6AA]/70">
          <h3
            id="ali-modal-title"
            className={`text-[20px] font-semibold text-[#263B30] leading-snug ${
              lang === 'ar' ? 'font-display-ar' : 'font-display-en'
            }`}
          >
            {title}
          </h3>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
            className="min-w-[44px] min-h-[44px] -m-2 inline-flex items-center justify-center rounded-[12px] text-[#263B30] hover:bg-[#EDE3D1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.6} />
          </button>
        </div>

        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
}
