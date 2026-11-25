import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '@/src/components/brand/BrandLogo';
import { isWhatsAppConfigured } from '@/src/config/site';
import { useLanguage } from '@/src/context/LanguageContext';

export function Footer({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) {
  const { t, localizedPath } = useLanguage();
  const [openCol, setOpenCol] = useState<string | null>('explore');
  const waReady = isWhatsAppConfigured();

  const columns = [
    {
      id: 'explore',
      title: t.footer.columns.explore,
      links: [
        { label: t.footer.links.home, to: localizedPath('/') },
        { label: t.footer.links.dogs, to: localizedPath('/dogs') },
        { label: t.footer.links.accessories, to: localizedPath('/accessories') },
      ],
    },
    {
      id: 'trust',
      title: t.footer.columns.trust,
      links: [
        { label: t.footer.links.care, to: localizedPath('/care') },
        { label: t.footer.links.about, to: localizedPath('/about') },
        { label: t.footer.links.privacy, to: localizedPath('/privacy') },
        { label: t.footer.links.terms, to: localizedPath('/terms') },
      ],
    },
  ];

  return (
    <footer className="bg-[#1B2A22] text-[#F7F3EA] on-dark border-t border-[#D8C6AA]/15">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Column 1: L2 Stacked Logo & Brand Summary */}
          <div className="space-y-4">
            <Link to={localizedPath('/')} className="inline-block" aria-label="ALI PETS">
              <BrandLogo variant="L2" tone="ivory" />
            </Link>
            <p className="text-[14px] leading-[1.7] text-[#D8C6AA] max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Columns 2 & 3: Accordion on mobile, open columns on desktop */}
          {columns.map((col) => {
            const isOpen = openCol === col.id;
            return (
              <div key={col.id} className="border-b border-[#D8C6AA]/15 md:border-none pb-3 md:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenCol(isOpen ? null : col.id)}
                  className="w-full md:pointer-events-none flex items-center justify-between py-2 md:py-0 md:mb-4 text-[14px] font-medium text-[#D8C6AA] cursor-pointer md:cursor-default"
                  aria-expanded={isOpen}
                >
                  <span>{col.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 md:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    strokeWidth={1.6}
                  />
                </button>
                <ul className={`${isOpen ? 'block' : 'hidden'} md:block space-y-2.5 pt-2 md:pt-0`}>
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="inline-block py-1 text-[15px] text-[#F7F3EA]/90 hover:text-[#D8C6AA] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Column 4: Alexandria Contact & WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-medium text-[#D8C6AA]">{t.footer.columns.contact}</h3>
            <p className="text-[15px] text-[#F7F3EA]">{t.footer.city}</p>
            <div>
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[12px] border border-[#D8C6AA]/40 text-[15px] font-medium text-[#F7F3EA] hover:bg-[#F7F3EA]/10 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
                <span>{t.nav.whatsapp}</span>
              </button>
              {!waReady && (
                <p className="mt-2.5 text-[14px] text-[#D8C6AA]/85">{t.footer.whatsappPending}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Transparency & Legal Row */}
        <div className="mt-12 pt-6 border-t border-[#D8C6AA]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[14px] text-[#D8C6AA]/90">
          <p>{t.footer.illustrativeNote}</p>
          <p className="shrink-0">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
