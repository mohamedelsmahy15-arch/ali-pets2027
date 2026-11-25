import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/src/components/layout/SectionHeader';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { useLanguage } from '@/src/context/LanguageContext';
import { FEATURED_BREEDS } from '@/src/data/breeds';

export function FeaturedBreedsSection() {
  const { lang, t, localizedPath } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <section className="py-14 md:py-20 bg-[#FFFDF8] border-t border-[#D8C6AA]/60">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={t.breeds.eyebrow}
          title={t.breeds.title}
          subtitle={t.breeds.note}
        />

        <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-2 md:pb-0">
          {FEATURED_BREEDS.map((breed) => (
            <article
              key={breed.id}
              className="group shrink-0 w-[72vw] sm:w-[46vw] md:w-auto snap-start flex flex-col"
            >
              <div className="aspect-[4/5] rounded-[20px] overflow-hidden border border-[#D8C6AA] bg-[#EDE3D1] mb-4">
                <ImageWithFallback
                  src={breed.image}
                  alt={breed.alt[lang]}
                  dominantColor={breed.dominantColor}
                  className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>

              <h3 className={`${displayFont} text-[20px] md:text-[22px] font-semibold leading-[1.35] text-[#1E2A23] mb-1.5`}>
                {breed.name[lang]}
              </h3>
              <p className="text-[16px] leading-[1.65] text-[#55634B] mb-3 flex-1">
                {breed.temperament[lang]}
              </p>

              <Link
                to={localizedPath('/dogs', `?breed=${breed.breedKey}`)}
                className="inline-flex items-center gap-2 text-[15px] font-medium text-[#263B30] hover:text-[#1B2A22] py-1 min-h-[44px]"
              >
                <span className="border-b border-[#263B30]/40 pb-0.5">{t.breeds.linkText}</span>
                <ArrowLeft
                  className="w-4 h-4 transition-transform duration-200 ltr:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
