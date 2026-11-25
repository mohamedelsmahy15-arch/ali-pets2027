import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useLanguage } from '@/src/context/LanguageContext';

export function WhatsAppCtaSection({
  onOpenWhatsApp,
}: {
  onOpenWhatsApp: () => void;
}) {
  const { lang, t } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <section className="py-12 md:py-16 bg-[#F7F3EA]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="rounded-[24px] bg-[#263B30] text-[#F7F3EA] on-dark border border-[#D8C6AA]/20 px-6 py-10 md:px-12 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <p
                className={`text-[14px] font-medium text-[#D8C6AA] ${
                  lang === 'en' ? 'uppercase tracking-[0.12em]' : ''
                }`}
              >
                {t.whatsappCta.eyebrow}
              </p>
              <h2 className={`${displayFont} type-section-h2 text-[#F7F3EA] text-balance`}>
                {t.whatsappCta.title}
              </h2>
              <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#EDE3D1]">
                {t.whatsappCta.subtitle}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-[14px] text-[#D8C6AA]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0 text-[#B7835B]" strokeWidth={1.6} aria-hidden="true" />
                  <span>{t.footer.city}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 shrink-0 text-[#B7835B]" strokeWidth={1.6} aria-hidden="true" />
                  <span>{t.footer.whatsappPending}</span>
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                variant="whatsapp"
                onDark
                size="lg"
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto"
              >
                {t.whatsappCta.button}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
