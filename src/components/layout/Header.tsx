import React, { useEffect, useState } from 'react';
import { Menu, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '@/src/components/brand/BrandLogo';
import { useLanguage } from '@/src/context/LanguageContext';
import { stripLangPrefix } from '@/src/utils/register';

interface HeaderProps {
  onOpenWhatsApp: () => void;
  cartCount?: number;
}

export function Header({ onOpenWhatsApp, cartCount = 0 }: HeaderProps) {
  const { lang, t, switchLanguage, localizedPath } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cleanPath = stripLangPrefix(location.pathname);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const navItems = [
    { label: t.nav.dogs, to: localizedPath('/dogs') },
    { label: t.nav.accessories, to: localizedPath('/accessories') },
    { label: t.nav.howItWorks, to: localizedPath('/', '', '#how-it-works') },
    { label: t.nav.about, to: localizedPath('/about') },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-[#F7F3EA]/96 backdrop-blur-md text-[#263B30] border-b border-[#D8C6AA]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-[64px] md:h-[72px] flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark L1 */}
          <Link
            to={localizedPath('/')}
            className="inline-flex items-center py-2 shrink-0 whitespace-nowrap"
            aria-label="ALI PETS"
          >
            <BrandLogo variant="L1" tone="forest" />
          </Link>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
            className="hidden lg:flex items-center gap-7"
          >
            {navItems.map((item) => {
              const active =
                cleanPath === stripLangPrefix(item.to.split('#')[0]) &&
                !item.to.includes('#');
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative py-2 text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors hover:text-[#1B2A22] after:content-[''] after:absolute after:bottom-1 after:inset-x-0 after:h-[1.5px] after:bg-[#263B30] after:origin-center after:transition-transform after:duration-200 ${
                    active
                      ? 'after:scale-x-100'
                      : 'after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Language switch + Cart (only if > 0) + WhatsApp action */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => switchLanguage(lang === 'ar' ? 'en' : 'ar')}
              aria-label={t.nav.langSwitchAria}
              className="min-w-[44px] min-h-[44px] px-2.5 inline-flex items-center justify-center rounded-[12px] text-[14px] font-mono-code font-medium tracking-wider whitespace-nowrap shrink-0 text-[#263B30] hover:bg-[#EDE3D1] transition-colors cursor-pointer"
            >
              {t.nav.langSwitch}
            </button>

            {cartCount > 0 && (
              <Link
                to={localizedPath('/cart')}
                aria-label={t.nav.cart}
                className="relative min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[12px] text-[#263B30] hover:bg-[#EDE3D1] transition-colors"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.6} />
                <span className="absolute top-1.5 end-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#B7835B] text-[#FFFDF8] text-[11px] font-mono-code flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            )}

            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="hidden sm:inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-[12px] text-[15px] font-medium whitespace-nowrap shrink-0 bg-[#263B30] text-[#F7F3EA] hover:bg-[#1B2A22] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
              <span>{t.nav.whatsapp}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileOpen}
              className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[12px] text-[#263B30] hover:bg-[#EDE3D1] transition-colors cursor-pointer"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" strokeWidth={1.6} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#F7F3EA] text-[#263B30] pt-[76px] pb-8 px-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'ar' ? 'قائمة التنقل' : 'Navigation menu'}
        >
          <nav className="flex flex-col divide-y divide-[#D8C6AA] pt-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`py-4 text-[21px] font-medium flex items-center justify-between ${
                  lang === 'ar' ? 'font-display-ar' : 'font-display-en'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="space-y-4 pt-6 border-t border-[#D8C6AA]">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full min-h-[52px] px-6 py-3 rounded-[12px] bg-[#263B30] text-[#F7F3EA] font-medium inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.6} />
              <span>{t.whatsappCta.button}</span>
            </button>

            <p className="text-[14px] text-[#55634B] text-center">{t.footer.city}</p>
          </div>
        </div>
      )}
    </>
  );
}
