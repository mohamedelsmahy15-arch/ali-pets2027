import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Footer } from '@/src/components/layout/Footer';
import { Header } from '@/src/components/layout/Header';
import { Button } from '@/src/components/ui/Button';
import { Modal } from '@/src/components/ui/Modal';
import { buildWhatsAppUrl, isWhatsAppConfigured } from '@/src/config/site';
import { LanguageProvider, useLanguage } from '@/src/context/LanguageContext';
import { DogDetailPage } from '@/src/pages/DogDetailPage';
import { DogsArchivePage } from '@/src/pages/DogsArchivePage';
import { HomePage } from '@/src/pages/HomePage';
import { PhaseStubPage } from '@/src/pages/PhaseStubPage';

function ScrollHandler() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

function AppShell() {
  const { lang, t } = useLanguage();
  const [waModalOpen, setWaModalOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    if (isWhatsAppConfigured()) {
      const greeting =
        lang === 'ar'
          ? 'السلام عليكم، بتواصل معاكم بخصوص الكلاب أو الإكسسوارات في ALI PETS بالإسكندرية.'
          : 'Hello, I am reaching out regarding ALI PETS in Alexandria.';
      const url = buildWhatsAppUrl(greeting);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
      }
    }
    setWaModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#1E2A23]">
      <ScrollHandler />
      <Header onOpenWhatsApp={handleOpenWhatsApp} cartCount={0} />

      <main className="flex-1">
        <Routes>
          {/* Arabic default routes */}
          <Route path="/" element={<HomePage onOpenWhatsApp={handleOpenWhatsApp} />} />
          <Route
            path="/dogs"
            element={<DogsArchivePage onOpenWhatsApp={handleOpenWhatsApp} />}
          />
          <Route
            path="/dogs/:listingId"
            element={<DogDetailPage />}
          />
          <Route
            path="/accessories"
            element={
              <PhaseStubPage
                kind="accessories"
                phase="3"
                titleAr="إكسسوارات الكلاب"
                titleEn="Accessories Store"
                descAr="في المرحلة الثالثة هيتضاف هنا متجر الإكسسوارات بالصور والأسعار وسلة الشراء."
                descEn="Phase 3 introduces the secondary accessories catalog (P01–P07 imagery), category chips, Quick View modal, and cart drawer."
              />
            }
          />
          <Route
            path="/cart"
            element={
              <PhaseStubPage
                kind="cart"
                phase="3"
                titleAr="سلة الإكسسوارات"
                titleEn="Accessories Cart"
                descAr="سلة شراء الإكسسوارات هتتفعل في المرحلة الثالثة، ومنفصلة تماماً عن الاستفسار عن الكلاب."
                descEn="The accessories shopping cart with persistent storage and quantity controls arrives in Phase 3, strictly separated from dog inquiries."
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <PhaseStubPage
                kind="checkout"
                phase="3"
                titleAr="إتمام طلب الإكسسوارات"
                titleEn="Accessories Checkout"
                descAr="تجهيز رسالة طلب الإكسسوارات على واتساب هيتضاف في المرحلة الثالثة."
                descEn="WhatsApp accessory order checkout is scheduled for Phase 3."
              />
            }
          />
          <Route
            path="/checkout/sent"
            element={
              <PhaseStubPage
                kind="checkout"
                phase="3"
                titleAr="تم تجهيز رسالة الطلب"
                titleEn="Order Message Prepared"
                descAr="شاشة تأكيد تجهيز رسالة طلب الإكسسوارات هتتنفذ في المرحلة الثالثة."
                descEn="The post-WhatsApp order confirmation view is scheduled for Phase 3."
              />
            }
          />
          <Route
            path="/care"
            element={
              <PhaseStubPage
                kind="care"
                phase="3"
                titleAr="نصائح رعاية الكلاب"
                titleEn="Responsible Dog Care"
                descAr="صفحة نصائح رعاية الكلب والتحضير قبل الاستلام هتكتمل في المرحلة الثالثة."
                descEn="The full responsible dog ownership guide will be completed in Phase 3."
              />
            }
          />
          <Route
            path="/about"
            element={
              <PhaseStubPage
                kind="about"
                phase="3"
                titleAr="عن محل ALI PETS والتواصل"
                titleEn="About & Contact — ALI PETS"
                descAr="معلومات المحل في الإسكندرية والعنوان التفصيلي وأرقام التواصل الرسمية هتتضاف هنا أول ما تتأكد في المرحلة الثالثة."
                descEn="Our Alexandria story and verified contact details page will be completed in Phase 3."
              />
            }
          />
          {/* Redirect /contact -> /about#contact per approved sitemap decision */}
          <Route path="/contact" element={<Navigate to="/about#contact" replace />} />
          <Route
            path="/privacy"
            element={
              <PhaseStubPage
                kind="legal"
                phase="3"
                titleAr="سياسة الخصوصية"
                titleEn="Privacy Policy"
                descAr="لسه بنجهز النص الرسمي من صاحب المحل."
                descEn="Awaiting official legal copy supplied by the business owner."
              />
            }
          />
          <Route
            path="/terms"
            element={
              <PhaseStubPage
                kind="legal"
                phase="3"
                titleAr="الشروط والأحكام"
                titleEn="Terms & Conditions"
                descAr="لسه بنجهز الشروط الرسمية من صاحب المحل."
                descEn="Awaiting official terms supplied by the business owner."
              />
            }
          />

          {/* English /en routes */}
          <Route path="/en" element={<HomePage onOpenWhatsApp={handleOpenWhatsApp} />} />
          <Route
            path="/en/dogs"
            element={<DogsArchivePage onOpenWhatsApp={handleOpenWhatsApp} />}
          />
          <Route
            path="/en/dogs/:listingId"
            element={<DogDetailPage />}
          />
          <Route
            path="/en/accessories"
            element={
              <PhaseStubPage
                kind="accessories"
                phase="3"
                titleAr="إكسسوارات الكلاب"
                titleEn="Accessories Store"
                descAr="في المرحلة الثالثة هيتضاف هنا متجر الإكسسوارات بالصور والأسعار وسلة الشراء."
                descEn="Phase 3 introduces the secondary accessories catalog (P01–P07 imagery), category chips, Quick View modal, and cart drawer."
              />
            }
          />
          <Route
            path="/en/cart"
            element={
              <PhaseStubPage
                kind="cart"
                phase="3"
                titleAr="سلة الإكسسوارات"
                titleEn="Accessories Cart"
                descAr="سلة شراء الإكسسوارات هتتفعل في المرحلة الثالثة، ومنفصلة تماماً عن الاستفسار عن الكلاب."
                descEn="The accessories shopping cart with persistent storage and quantity controls arrives in Phase 3, strictly separated from dog inquiries."
              />
            }
          />
          <Route
            path="/en/checkout"
            element={
              <PhaseStubPage
                kind="checkout"
                phase="3"
                titleAr="إتمام طلب الإكسسوارات"
                titleEn="Accessories Checkout"
                descAr="تجهيز رسالة طلب الإكسسوارات على واتساب هيتضاف في المرحلة الثالثة."
                descEn="WhatsApp accessory order checkout is scheduled for Phase 3."
              />
            }
          />
          <Route
            path="/en/checkout/sent"
            element={
              <PhaseStubPage
                kind="checkout"
                phase="3"
                titleAr="تم تجهيز رسالة الطلب"
                titleEn="Order Message Prepared"
                descAr="شاشة تأكيد تجهيز رسالة طلب الإكسسوارات هتتنفذ في المرحلة الثالثة."
                descEn="The post-WhatsApp order confirmation view is scheduled for Phase 3."
              />
            }
          />
          <Route
            path="/en/care"
            element={
              <PhaseStubPage
                kind="care"
                phase="3"
                titleAr="نصائح رعاية الكلاب"
                titleEn="Responsible Dog Care"
                descAr="صفحة نصائح رعاية الكلب والتحضير قبل الاستلام هتكتمل في المرحلة الثالثة."
                descEn="The full responsible dog ownership guide will be completed in Phase 3."
              />
            }
          />
          <Route
            path="/en/about"
            element={
              <PhaseStubPage
                kind="about"
                phase="3"
                titleAr="عن محل ALI PETS والتواصل"
                titleEn="About & Contact — ALI PETS"
                descAr="معلومات المحل في الإسكندرية والعنوان التفصيلي وأرقام التواصل الرسمية هتتضاف هنا أول ما تتأكد في المرحلة الثالثة."
                descEn="Our Alexandria story and verified contact details page will be completed in Phase 3."
              />
            }
          />
          <Route path="/en/contact" element={<Navigate to="/en/about#contact" replace />} />
          <Route
            path="/en/privacy"
            element={
              <PhaseStubPage
                kind="legal"
                phase="3"
                titleAr="سياسة الخصوصية"
                titleEn="Privacy Policy"
                descAr="لسه بنجهز النص الرسمي من صاحب المحل."
                descEn="Awaiting official legal copy supplied by the business owner."
              />
            }
          />
          <Route
            path="/en/terms"
            element={
              <PhaseStubPage
                kind="legal"
                phase="3"
                titleAr="الشروط والأحكام"
                titleEn="Terms & Conditions"
                descAr="لسه بنجهز الشروط الرسمية من صاحب المحل."
                descEn="Awaiting official terms supplied by the business owner."
              />
            }
          />

          {/* Reserved /admin/* routes (unimplemented, no public links) & 404 */}
          <Route
            path="*"
            element={
              <PhaseStubPage
                kind="not-found"
                phase="none"
                titleAr={t.stub.notFoundTitle}
                titleEn={t.stub.notFoundTitle}
                descAr={t.stub.notFoundBody}
                descEn={t.stub.notFoundBody}
              />
            }
          />
        </Routes>
      </main>

      <Footer onOpenWhatsApp={handleOpenWhatsApp} />

      {/* Honest WhatsApp setup modal when whatsappNumber is unconfigured */}
      <Modal
        open={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        title={t.whatsappCta.notConfiguredTitle}
      >
        <div className="space-y-4">
          <p className="text-[15px] leading-[1.7] text-[#55634B]">
            {t.whatsappCta.notConfiguredBody}
          </p>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setWaModalOpen(false)}>
              {t.demo.understandClose}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </BrowserRouter>
  );
}
