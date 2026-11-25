import React from 'react';
import { CategoryTilesSection } from '@/src/components/home/CategoryTilesSection';
import { FeaturedBreedsSection } from '@/src/components/home/FeaturedBreedsSection';
import { HeroSection } from '@/src/components/home/HeroSection';
import { HowItWorksSection } from '@/src/components/home/HowItWorksSection';
import { RecentDogsSection } from '@/src/components/home/RecentDogsSection';
import { ResponsibleCareSection } from '@/src/components/home/ResponsibleCareSection';
import { SelectedAccessoriesSection } from '@/src/components/home/SelectedAccessoriesSection';
import { WhatsAppCtaSection } from '@/src/components/home/WhatsAppCtaSection';
import { WhyAliPetsSection } from '@/src/components/home/WhyAliPetsSection';
import { DEMO_DOGS } from '@/src/data/dogs';

export function HomePage({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) {
  return (
    <>
      {/* 1. Direct Storefront Hero */}
      <HeroSection />

      {/* 2. Quick Category Browse */}
      <CategoryTilesSection dogs={DEMO_DOGS} />

      {/* 3. Sample Dog Listings (Demo Preview — Direct Links to /dogs/:listingId) */}
      <RecentDogsSection dogs={DEMO_DOGS} />

      {/* 4. Secondary Accessories Store Preview */}
      <SelectedAccessoriesSection />

      {/* 5. Practical Buying Steps */}
      <HowItWorksSection />

      {/* 6. Why Choose ALI PETS */}
      <WhyAliPetsSection />

      {/* 7. General Breed Guide */}
      <FeaturedBreedsSection />

      {/* 8. Practical Advice Before Buying */}
      <ResponsibleCareSection />

      {/* 9. Contact & Visit CTA */}
      <WhatsAppCtaSection onOpenWhatsApp={onOpenWhatsApp} />
    </>
  );
}
