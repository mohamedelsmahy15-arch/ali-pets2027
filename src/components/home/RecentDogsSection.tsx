import React from 'react';
import { SectionHeader } from '@/src/components/layout/SectionHeader';
import { Button } from '@/src/components/ui/Button';
import { DogCard } from '@/src/components/ui/DogCard';
import { useLanguage } from '@/src/context/LanguageContext';
import type { DogListing } from '@/src/types';

interface RecentDogsSectionProps {
  dogs: DogListing[];
}

export function RecentDogsSection({ dogs }: RecentDogsSectionProps) {
  const { t, localizedPath } = useLanguage();
  const displayDogs = dogs.slice(0, 6);

  if (displayDogs.length === 0) {
    return null;
  }

  return (
    <section className="py-14 md:py-20 bg-[#F7F3EA] border-t border-[#D8C6AA]/60">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeader
          eyebrow={t.recentDogs.eyebrow}
          title={t.recentDogs.title}
          subtitle={t.recentDogs.subtitle}
          linkTo={localizedPath('/dogs')}
          linkLabel={t.recentDogs.viewAll}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayDogs.map((dog, index) => (
            <div key={dog.listingId} className={index >= 3 ? 'hidden sm:block' : ''}>
              <DogCard dog={dog} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button to={localizedPath('/dogs')} variant="secondary" fullWidth withArrow>
            {t.recentDogs.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}
