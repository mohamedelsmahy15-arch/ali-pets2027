import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Cake,
  Calendar,
  Lock,
  Palette,
  Ruler,
  Tag,
  UserRound,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { DogDocumentationSection } from '@/src/components/dogs/DogDocumentationSection';
import { DogMediaGallery } from '@/src/components/dogs/DogMediaGallery';
import { WelcomeHomeSection } from '@/src/components/dogs/WelcomeHomeSection';
import { WhatsAppInquiryModal } from '@/src/components/dogs/WhatsAppInquiryModal';
import { Button } from '@/src/components/ui/Button';
import { DogCard } from '@/src/components/ui/DogCard';
import { EmptyIllustration } from '@/src/components/ui/EmptyIllustration';
import { AvailabilityBadge, RegisterStamp } from '@/src/components/ui/StatusBadge';
import { useLanguage } from '@/src/context/LanguageContext';
import { ACCESSORIES_PREVIEW } from '@/src/data/accessoriesPreview';
import { DEMO_DOGS } from '@/src/data/dogs';
import {
  findDogByListingId,
  getSimilarDogs,
} from '@/src/utils/dogFilter';

export function DogDetailPage() {
  const { listingId } = useParams<{ listingId: string }>();
  const { lang, t, localizedPath } = useLanguage();
  const displayFont = lang === 'ar' ? 'font-display-ar' : 'font-display-en';
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([]);
  const [welcomeHomeSkipped, setWelcomeHomeSkipped] = useState(false);

  useEffect(() => {
    setSelectedAccessoryIds([]);
    setWelcomeHomeSkipped(false);
    setInquiryModalOpen(false);
  }, [listingId]);

  const selectedAccessories = useMemo(
    () => ACCESSORIES_PREVIEW.filter((item) => selectedAccessoryIds.includes(item.id)),
    [selectedAccessoryIds]
  );

  const handleToggleAccessory = (id: string) => {
    setSelectedAccessoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSkipWelcomeHome = () => {
    setWelcomeHomeSkipped(true);
    setSelectedAccessoryIds([]);
  };

  const dog = findDogByListingId(DEMO_DOGS, listingId);

  if (!dog) {
    return (
      <div className="pt-[64px] md:pt-[72px] bg-[#F7F3EA] min-h-[75vh] flex items-center">
        <div className="max-w-[680px] mx-auto px-4 md:px-6 py-16 w-full">
          <div
            data-testid="dog-detail-not-found"
            className="bg-[#FFFDF8] border border-[#D8C6AA] rounded-[24px] p-8 md:p-12 text-center space-y-6 shadow-elevated"
          >
            <div className="flex justify-center">
              <EmptyIllustration kind="not-found" className="w-20 h-20" />
            </div>
            <div className="space-y-3">
              <h1 className={`${displayFont} type-section-h2 text-[#263B30]`}>
                {t.detail.notFoundTitle}
              </h1>
              <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#55634B]">
                {t.detail.notFoundBody(listingId ?? '')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button to={localizedPath('/dogs')} variant="primary" withArrow>
                {t.detail.backToArchive}
              </Button>
              <Button to={localizedPath('/')} variant="secondary">
                {t.detail.notFoundBackHome}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ageText = dog.ageLabel?.[lang]?.trim() || t.detail.notRecorded;
  const genderText = t.card.gender[dog.gender];
  const colorText = dog.coatColor?.[lang]?.trim() || t.detail.notRecorded;
  const sizeText =
    dog.expectedAdultSize?.[lang]?.trim() ||
    (dog.sizeCategory ? t.archive.sizes[dog.sizeCategory] : t.detail.notRecorded);
  const birthDateText = dog.birthDate?.trim() || t.detail.notRecorded;

  const priceText =
    typeof dog.priceEgp === 'number' && Number.isFinite(dog.priceEgp)
      ? `${dog.priceEgp.toLocaleString('en-US')} ${lang === 'ar' ? 'ج.م' : 'EGP'}`
      : t.detail.priceOnInquiryDetail;

  const similarDogs = getSimilarDogs(DEMO_DOGS, dog, 3);

  const specs = [
    {
      key: 'breed',
      icon: Tag,
      label: t.detail.specs.breed,
      value: dog.breed[lang],
    },
    {
      key: 'age',
      icon: Calendar,
      label: t.detail.specs.age,
      value: ageText,
    },
    {
      key: 'gender',
      icon: UserRound,
      label: t.detail.specs.gender,
      value: genderText,
    },
    {
      key: 'coatColor',
      icon: Palette,
      label: t.detail.specs.coatColor,
      value: colorText,
    },
    {
      key: 'size',
      icon: Ruler,
      label: t.detail.specs.size,
      value: sizeText,
    },
    {
      key: 'birthDate',
      icon: Cake,
      label: t.detail.specs.birthDate,
      value: birthDateText,
    },
  ];

  return (
    <div className="pt-[64px] md:pt-[72px] bg-[#F7F3EA]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-12 space-y-10 md:space-y-14">
        {/* Breadcrumb & Back Link */}
        <nav
          aria-label={lang === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <ol className="flex flex-wrap items-center gap-2 text-[14px] md:text-[15px] text-[#55634B]">
            <li>
              <Link
                to={localizedPath('/')}
                className="hover:text-[#263B30] underline-offset-4 hover:underline"
              >
                {t.detail.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to={localizedPath('/dogs')}
                className="hover:text-[#263B30] underline-offset-4 hover:underline"
              >
                {t.detail.breadcrumbArchive}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-mono-code font-medium text-[#263B30]" aria-current="page">
              <bdi dir="ltr">{dog.listingId}</bdi>
            </li>
          </ol>

          <Link
            to={localizedPath('/dogs')}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#263B30] hover:text-[#1B2A22] min-h-[44px]"
          >
            <ArrowRight className="w-4 h-4 ltr:rotate-180" strokeWidth={1.7} aria-hidden="true" />
            <span>{t.detail.backToArchive}</span>
          </Link>
        </nav>

        {/* Single Crisp Demo Preview Notice */}
        {dog.isDemo && (
          <div
            data-testid="dog-detail-demo-banner"
            className="px-4 py-3.5 rounded-[14px] bg-[#EDE3D1] border border-[#D8C6AA] text-[15px] font-medium text-[#8E5F3C]"
          >
            {t.demo.bannerShort}
          </div>
        )}

        {/* Primary Profile Grid: Prominent Dog Media + Structured Details */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left/Start Column: Prominent Photo Gallery */}
          <div className="lg:col-span-5">
            <DogMediaGallery
              media={dog.media}
              breedName={dog.breed[lang]}
              isDemo={dog.isDemo}
            />
          </div>

          {/* Right/End Column: Separated ID + Availability + Heading + Specs Grid + Inquiry State */}
          <div className="lg:col-span-7 space-y-6">
            {/* Separated Listing ID & Availability Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#D8C6AA]/80">
              <div className="flex items-center gap-2.5">
                <span className="text-[14px] font-medium text-[#55634B]">
                  {t.detail.referenceIdLabel}:
                </span>
                <RegisterStamp
                  listingId={dog.listingId}
                  className="text-[14px] px-3 py-1.5"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[14px] font-medium text-[#55634B]">
                  {t.detail.availabilityLabel}:
                </span>
                <AvailabilityBadge
                  availability={dog.availability}
                  className="text-[14px] px-3 py-1.5"
                />
              </div>
            </div>

            {/* Breed Headline & Brief Overview */}
            <div className="space-y-3">
              <h1 className={`${displayFont} type-hero text-[#263B30]`}>
                {dog.breed[lang]}
              </h1>
              {dog.personality?.[lang] && (
                <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#1E2A23]">
                  {dog.personality[lang]}
                </p>
              )}
            </div>

            {/* Clear Price Band */}
            <div className="p-4 sm:p-5 rounded-[16px] bg-[#FFFDF8] border border-[#D8C6AA] flex flex-wrap items-baseline justify-between gap-3">
              <span className="text-[15px] font-medium text-[#55634B]">
                {t.detail.priceSectionLabel}
              </span>
              <span className="text-[18px] md:text-[20px] font-semibold text-[#263B30] tabular-nums">
                {priceText}
              </span>
            </div>

            {/* Structured Specifications Grid with Icons */}
            <div className="space-y-3">
              <h2 className={`${displayFont} text-[20px] font-semibold text-[#263B30]`}>
                {t.detail.specsTitle}
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {specs.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={spec.key}
                      className="flex items-center gap-3.5 p-4 rounded-[16px] bg-[#FFFDF8] border border-[#D8C6AA]"
                    >
                      <span className="w-10 h-10 rounded-[12px] bg-[#EDE3D1] border border-[#D8C6AA] text-[#263B30] inline-flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-[14px] text-[#55634B]">{spec.label}</dt>
                        <dd className="text-[16px] md:text-[17px] font-semibold text-[#1E2A23] mt-0.5">
                          {spec.value}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>

            {/* Inquiry Guardrail Card — Opens 2-step preview modal (WhatsApp strictly blocked for Demo/Sold) */}
            <div
              data-testid="dog-detail-inquiry-guard"
              className="p-5 sm:p-6 rounded-[20px] bg-[#FFFDF8] border border-[#D8C6AA] space-y-3"
            >
              <h2 className="text-[17px] font-semibold text-[#263B30]">
                {t.detail.inquiryCardTitle}
              </h2>

              {dog.availability === 'sold' ? (
                <>
                  <Button
                    variant="secondary"
                    fullWidth
                    disabled
                    data-testid="dog-detail-sold-btn"
                    className="justify-center disabled:opacity-80 bg-[#EDE3D1]/65 border-[#D8C6AA] text-[#55634B]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{t.detail.inquiryBlockedSoldBtn}</span>
                    </span>
                  </Button>
                  <p className="text-[15px] leading-[1.65] text-[#55634B]">
                    {t.detail.inquiryBlockedSoldHint}
                  </p>
                </>
              ) : dog.isDemo ? (
                <>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => setInquiryModalOpen(true)}
                    data-testid="dog-detail-open-inquiry-btn"
                  >
                    {t.detail.inquiryDemoOpenBtn}
                  </Button>
                  <p className="text-[15px] leading-[1.65] text-[#55634B]">
                    {t.detail.inquiryBlockedDemoHint}
                  </p>
                  {selectedAccessories.length > 0 && (
                    <p
                      data-testid="dog-detail-selected-acc-note"
                      className="text-[14px] font-medium text-[#263B30]"
                    >
                      {t.welcomeHome.selectedSummary(selectedAccessories.length)}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant="whatsapp"
                    fullWidth
                    onClick={() => setInquiryModalOpen(true)}
                    data-testid="dog-detail-open-inquiry-btn"
                  >
                    {t.detail.inquiryOpenRealBtn}
                  </Button>
                  <p className="text-[15px] leading-[1.65] text-[#55634B]">
                    {t.detail.inquiryRealHint}
                  </p>
                  {selectedAccessories.length > 0 && (
                    <p
                      data-testid="dog-detail-selected-acc-note"
                      className="text-[14px] font-medium text-[#263B30]"
                    >
                      {t.welcomeHome.selectedSummary(selectedAccessories.length)}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Paperwork & Vaccinations Section */}
        <DogDocumentationSection dog={dog} />

        {/* Welcome Home Complementary Recommendations */}
        <WelcomeHomeSection
          dog={dog}
          selectedIds={selectedAccessoryIds}
          skipped={welcomeHomeSkipped}
          onToggleItem={handleToggleAccessory}
          onSkip={handleSkipWelcomeHome}
          onRestore={() => setWelcomeHomeSkipped(false)}
          onOpenInquiry={() => setInquiryModalOpen(true)}
        />

        {/* Similar Preview Dogs */}
        {similarDogs.length > 0 && (
          <section className="space-y-6 pt-4 border-t border-[#D8C6AA]/70">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className={`${displayFont} type-section-h2 text-[#263B30]`}>
                {t.detail.similarTitle}
              </h2>
              <Link
                to={localizedPath('/dogs')}
                className="text-[15px] font-medium text-[#263B30] hover:text-[#1B2A22] underline underline-offset-4 min-h-[44px] inline-flex items-center"
              >
                {t.detail.similarViewAll}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarDogs.map((sim) => (
                <DogCard key={sim.listingId} dog={sim} compactDocSummary />
              ))}
            </div>
          </section>
        )}
      </div>

      <WhatsAppInquiryModal
        open={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        dog={dog}
        selectedAccessories={selectedAccessories}
      />
    </div>
  );
}
