import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/src/components/layout/SectionHeader';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { useLanguage } from '@/src/context/LanguageContext';
import { ACCESSORIES_PREVIEW } from '@/src/data/accessoriesPreview';

export function SelectedAccessoriesSection() {
  const { lang, t, localizedPath } = useLanguage();

  return (
    <section
      data-testid="home-accessories-section"
      className="py-12 md:py-16 bg-[#EDE3D1] border-y border-[#D8C6AA]"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={t.accessoriesSection.eyebrow}
          title={t.accessoriesSection.title}
          subtitle={t.accessoriesSection.previewNote}
          linkTo={localizedPath('/accessories')}
          linkLabel={t.accessoriesSection.viewStore}
          headingLevel="h3"
        />

        {/* Subordinate 6-product editorial strip — no fake prices, ratings, discounts, or stock claims */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {ACCESSORIES_PREVIEW.map((item) => (
            <Link
              key={item.id}
              to={localizedPath('/accessories', `?cat=${item.categoryKey}`)}
              data-testid={`home-accessory-card-${item.id}`}
              className="group flex flex-col bg-[#FFFDF8] border border-[#D8C6AA] rounded-[16px] overflow-hidden transition-colors duration-200 hover:border-[#718066]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F7F3EA] border-b border-[#D8C6AA]/60">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.alt[lang]}
                  dominantColor={item.dominantColor}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-3.5 flex flex-col flex-1 gap-1">
                <p className="text-[13px] text-[#55634B]">{item.categoryLabel[lang]}</p>
                <h4 className="text-[15px] font-semibold text-[#1E2A23] leading-snug line-clamp-2">
                  {item.name[lang]}
                </h4>
                <p className="mt-auto pt-1.5 text-[12px] font-medium text-[#8E5F3C]">
                  {t.accessoriesSection.demoCaption}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
