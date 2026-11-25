import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEMO_DOGS } from '@/src/data/dogs';
import { TRANSLATIONS } from '@/src/i18n/translations';
import type { Language } from '@/src/types';
import { findDogByListingId } from '@/src/utils/dogFilter';
import { detectLangFromPath, stripLangPrefix, toLocalizedPath } from '@/src/utils/register';

const LANG_STORAGE_KEY = 'ali_pets_lang';

interface LanguageContextValue {
  lang: Language;
  dir: 'rtl' | 'ltr';
  t: (typeof TRANSLATIONS)['ar'] | (typeof TRANSLATIONS)['en'];
  switchLanguage: (nextLang: Language) => void;
  localizedPath: (path: string, search?: string, hash?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const lang: Language = detectLangFromPath(location.pathname);
  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';

  // Restore persisted EN preference on initial root entry if user previously selected EN
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'en' && location.pathname === '/') {
        navigate(`/en${location.search}${location.hash}`, { replace: true });
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    const basePath = stripLangPrefix(location.pathname);
    if (basePath === '/dogs') {
      document.title = TRANSLATIONS[lang].archive.pageTitle;
    } else if (basePath.startsWith('/dogs/')) {
      const id = basePath.slice('/dogs/'.length);
      const dog = findDogByListingId(DEMO_DOGS, id);
      document.title = dog
        ? `ALI PETS — ${dog.breed[lang]} (${dog.listingId})`
        : `ALI PETS — ${TRANSLATIONS[lang].detail.notFoundTitle}`;
    } else {
      document.title = TRANSLATIONS[lang].seo.homeTitle;
    }
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage restrictions
    }
  }, [lang, dir, location.pathname]);

  const switchLanguage = (nextLang: Language) => {
    if (nextLang === lang) return;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
    } catch {
      // Ignore storage restrictions
    }
    const target = toLocalizedPath(
      location.pathname,
      nextLang,
      location.search,
      location.hash
    );
    navigate(target);
  };

  const localizedPath = (path: string, search = '', hash = '') =>
    toLocalizedPath(path, lang, search, hash);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir,
        t: TRANSLATIONS[lang],
        switchLanguage,
        localizedPath,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
