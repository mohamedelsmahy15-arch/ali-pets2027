import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/src/components/layout/SectionHeader';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { useLanguage } from '@/src/context/LanguageContext';
import { CATEGORY_TILES } from '@/src/data/dogs';
import type { DogListing } from '@/src/types';
import { countDogsForCategory } from '@/src/utils/register';

export function CategoryTilesSection({ dogs }: { dogs: DogListing[] }) {
  const { lang, t, localizedPath } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';

  return (
    <section className="py-14 md:py-20 bg-[#F7F3EA]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={t.categories.eyebrow}
          title={t.categories.title}
          linkTo={localizedPath('/dogs')}
          linkLabel={t.categories.linkAll}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORY_TILES.map((tile) => {
            const count = countDogsForCategory(dogs, tile.id);
            return (
              <Link
                key={tile.id}
                to={localizedPath('/dogs', tile.filterQuery)}
                className="group relative aspect-[4/5] rounded-[20px] overflow-hidden border border-[#D8C6AA] bg-[#EDE3D1]"
              >
                <ImageWithFallback
                  src={tile.image}
                  alt={tile.alt[lang]}
                  dominantColor={tile.dominantColor}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B2A22]/92 via-[#1B2A22]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-[#F7F3EA] space-y-1">
                  <h3 className={`${displayFont} text-[19px] md:text-[22px] font-semibold leading-tight`}>
                    {tile.label[lang]}
                  </h3>
                  <p className="text-[14px] text-[#EDE3D1] tabular-nums">
                    {t.categories.countLabel(count)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
