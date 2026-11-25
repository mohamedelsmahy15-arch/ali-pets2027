import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Lock,
  MessageCircle,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Modal } from '@/src/components/ui/Modal';
import { RegisterStamp } from '@/src/components/ui/StatusBadge';
import { SITE_CONFIG } from '@/src/config/site';
import { useLanguage } from '@/src/context/LanguageContext';
import type {
  DogInquiryAccessoryRef,
  DogInquiryFormValues,
  DogListing,
  InquiryType,
} from '@/src/types';
import {
  INQUIRY_MAX_MESSAGE_LENGTH,
  buildDogInquiryMessage,
  buildDogInquiryWhatsAppUrl,
  getWhatsAppActionState,
  validateDogInquiryForm,
  type DogInquiryValidationResult,
} from '@/src/utils/whatsappInquiry';

interface WhatsAppInquiryModalProps {
  open: boolean;
  onClose: () => void;
  dog: DogListing;
  selectedAccessories?: DogInquiryAccessoryRef[];
}

const INITIAL_FORM: DogInquiryFormValues = {
  name: '',
  phone: '',
  areaId: '',
  inquiryType: 'more_info',
  message: '',
};

const INQUIRY_TYPES: InquiryType[] = [
  'more_info',
  'viewing',
  'price',
  'delivery',
];

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below when clipboard API is unavailable or restricted
    }
  }

  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }

  return false;
}

export function WhatsAppInquiryModal({
  open,
  onClose,
  dog,
  selectedAccessories = [],
}: WhatsAppInquiryModalProps) {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<DogInquiryFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<DogInquiryValidationResult['errors']>({});
  const [copied, setCopied] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setForm(INITIAL_FORM);
    setErrors({});
    setCopied(false);
    setConsentChecked(false);
  }, [open, dog.listingId]);

  useEffect(() => {
    if (!open) return;
    const scrollableParent = modalBodyRef.current?.closest('.overflow-y-auto');
    if (scrollableParent) {
      scrollableParent.scrollTop = 0;
    }
  }, [step, open]);

  const actionState = getWhatsAppActionState(dog, SITE_CONFIG.whatsappNumber);

  const listingUrl =
    typeof window !== 'undefined' ? window.location.href : undefined;

  const previewMessage =
    step === 2
      ? buildDogInquiryMessage({
          dog,
          form,
          lang,
          listingUrl,
          selectedAccessories,
        })
      : '';

  const whatsappUrl =
    step === 2 && actionState.reason === 'allowed' && actionState.canOpenWhatsApp
      ? buildDogInquiryWhatsAppUrl({
          dog,
          message: previewMessage,
          whatsappNumber: SITE_CONFIG.whatsappNumber,
        })
      : null;

  const updateField = <K extends keyof DogInquiryFormValues>(
    field: K,
    value: DogInquiryFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateDogInquiryForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setCopied(false);
    setConsentChecked(false);
    setStep(2);
  };

  const handleCopyMessage = async () => {
    if (!previewMessage) return;
    const ok = await copyTextToClipboard(previewMessage);
    if (ok) {
      setCopied(true);
    }
  };

  const nameErrorText =
    errors.name === 'required'
      ? t.inquiryModal.errors.nameRequired
      : errors.name === 'min_length'
      ? t.inquiryModal.errors.nameMinLength
      : undefined;

  const phoneErrorText =
    errors.phone === 'required'
      ? t.inquiryModal.errors.phoneRequired
      : errors.phone === 'invalid_phone'
      ? t.inquiryModal.errors.phoneInvalid
      : undefined;

  const areaErrorText =
    errors.areaId === 'required'
      ? t.inquiryModal.errors.areaRequired
      : undefined;

  const messageErrorText =
    errors.message === 'max_length'
      ? t.inquiryModal.errors.messageMaxLength
      : undefined;

  const blockedButtonLabel =
    actionState.reason === 'blocked_demo'
      ? t.inquiryModal.actions.whatsappBlockedDemo
      : actionState.reason === 'blocked_sold'
      ? t.inquiryModal.actions.whatsappBlockedSold
      : t.inquiryModal.actions.whatsappNotConfigured;

  return (
    <Modal open={open} onClose={onClose} title={t.inquiryModal.title}>
      <div
        ref={modalBodyRef}
        className="space-y-5"
        data-testid="whatsapp-inquiry-modal"
      >
        {/* Step Progress & Selected Dog Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D8C6AA]/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <RegisterStamp listingId={dog.listingId} />
            <span className="text-[15px] font-semibold text-[#263B30] truncate">
              {dog.breed[lang]}
            </span>
          </div>
          <span
            data-testid="inquiry-step-badge"
            className="inline-flex items-center px-3 py-1 rounded-[10px] bg-[#EDE3D1] border border-[#D8C6AA] text-[13px] font-medium text-[#263B30]"
          >
            {step === 1
              ? t.inquiryModal.step1Badge
              : t.inquiryModal.step2Badge}
          </span>
        </div>

        {/* Guardrail Warning Banner (Demo / Sold / Unconfigured) */}
        {actionState.reason === 'blocked_demo' && (
          <div
            data-testid="inquiry-demo-banner"
            className="flex items-start gap-2.5 p-3.5 rounded-[14px] bg-[#EDE3D1] border border-[#D8C6AA] text-[14px] leading-[1.6] text-[#8E5F3C]"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
            <span>{t.inquiryModal.demoBanner}</span>
          </div>
        )}

        {actionState.reason === 'blocked_sold' && (
          <div
            data-testid="inquiry-sold-banner"
            className="flex items-start gap-2.5 p-3.5 rounded-[14px] bg-[#B7835B]/15 border border-[#B7835B]/45 text-[14px] leading-[1.6] text-[#8E5F3C]"
          >
            <ShieldAlert className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
            <span>{t.inquiryModal.soldBanner}</span>
          </div>
        )}

        {step === 2 && actionState.reason === 'not_configured' && (
          <div
            data-testid="inquiry-not-configured-banner"
            className="flex items-start gap-2.5 p-3.5 rounded-[14px] bg-[#EDE3D1] border border-[#D8C6AA] text-[14px] leading-[1.6] text-[#55634B]"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
            <span>{t.inquiryModal.notConfiguredBanner}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleStep1Submit} noValidate className="space-y-4">
            <p className="text-[15px] leading-[1.65] text-[#55634B]">
              {t.inquiryModal.step1Intro}
            </p>

            {selectedAccessories.length > 0 && (
              <div
                data-testid="inquiry-selected-accessories"
                className="p-3.5 rounded-[14px] bg-[#F7F3EA] border border-[#D8C6AA] space-y-1.5"
              >
                <p className="text-[13px] font-semibold text-[#263B30]">
                  {t.inquiryModal.selectedAccessoriesLabel}
                </p>
                <ul className="space-y-1 text-[14px] text-[#1E2A23]">
                  {selectedAccessories.map((acc) => (
                    <li key={acc.id}>• {acc.name[lang]}</li>
                  ))}
                </ul>
                <p className="text-[12px] text-[#55634B]">
                  {t.inquiryModal.selectedAccessoriesHint}
                </p>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="inquiry-name"
                className="block text-[14px] font-semibold text-[#263B30]"
              >
                {t.inquiryModal.fields.nameLabel}
              </label>
              <input
                id="inquiry-name"
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder={t.inquiryModal.fields.namePlaceholder}
                aria-invalid={Boolean(nameErrorText)}
                className={`w-full min-h-[48px] px-4 py-2.5 rounded-[12px] bg-[#F7F3EA] border text-[15px] text-[#1E2A23] placeholder:text-[#7A7467] focus:outline-none focus:ring-2 focus:ring-[#263B30] ${
                  nameErrorText ? 'border-[#9F3E34]' : 'border-[#D8C6AA]'
                }`}
              />
              {nameErrorText && (
                <p
                  role="alert"
                  data-testid="inquiry-error-name"
                  className="text-[13px] font-medium text-[#9F3E34]"
                >
                  {nameErrorText}
                </p>
              )}
            </div>

            {/* Egyptian Mobile */}
            <div className="space-y-1.5">
              <label
                htmlFor="inquiry-phone"
                className="block text-[14px] font-semibold text-[#263B30]"
              >
                {t.inquiryModal.fields.phoneLabel}
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                dir="ltr"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder={t.inquiryModal.fields.phonePlaceholder}
                aria-invalid={Boolean(phoneErrorText)}
                className={`w-full min-h-[48px] px-4 py-2.5 rounded-[12px] bg-[#F7F3EA] border text-[15px] text-[#1E2A23] placeholder:text-[#7A7467] focus:outline-none focus:ring-2 focus:ring-[#263B30] ${
                  phoneErrorText ? 'border-[#9F3E34]' : 'border-[#D8C6AA]'
                }`}
              />
              {phoneErrorText && (
                <p
                  role="alert"
                  data-testid="inquiry-error-phone"
                  className="text-[13px] font-medium text-[#9F3E34]"
                >
                  {phoneErrorText}
                </p>
              )}
            </div>

            {/* Alexandria Area */}
            <div className="space-y-1.5">
              <label
                htmlFor="inquiry-area"
                className="block text-[14px] font-semibold text-[#263B30]"
              >
                {t.inquiryModal.fields.areaLabel}
              </label>
              <div className="relative">
                <select
                  id="inquiry-area"
                  value={form.areaId}
                  onChange={(e) => updateField('areaId', e.target.value)}
                  aria-invalid={Boolean(areaErrorText)}
                  className={`w-full min-h-[48px] ps-4 pe-10 py-2.5 rounded-[12px] bg-[#F7F3EA] border text-[15px] text-[#1E2A23] appearance-none focus:outline-none focus:ring-2 focus:ring-[#263B30] ${
                    areaErrorText ? 'border-[#9F3E34]' : 'border-[#D8C6AA]'
                  }`}
                >
                  <option value="">{t.inquiryModal.fields.areaPlaceholder}</option>
                  {SITE_CONFIG.alexandriaAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area[lang]}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-[#55634B] pointer-events-none absolute top-1/2 -translate-y-1/2 end-3.5"
                  aria-hidden="true"
                />
              </div>
              {areaErrorText && (
                <p
                  role="alert"
                  data-testid="inquiry-error-area"
                  className="text-[13px] font-medium text-[#9F3E34]"
                >
                  {areaErrorText}
                </p>
              )}
            </div>

            {/* Inquiry Type */}
            <fieldset className="space-y-2">
              <legend className="text-[14px] font-semibold text-[#263B30]">
                {t.inquiryModal.fields.inquiryTypeLabel}
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INQUIRY_TYPES.map((typeKey) => {
                  const selected = form.inquiryType === typeKey;
                  return (
                    <label
                      key={typeKey}
                      className={`min-h-[48px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-[12px] border cursor-pointer ${
                        selected
                          ? 'bg-[#263B30] text-[#F7F3EA] border-[#263B30] font-semibold'
                          : 'bg-[#F7F3EA] text-[#1E2A23] border-[#D8C6AA] hover:border-[#263B30]/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiryType"
                        value={typeKey}
                        checked={selected}
                        onChange={() => updateField('inquiryType', typeKey)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selected
                            ? 'border-[#F7F3EA] bg-[#F7F3EA]/20'
                            : 'border-[#718066]'
                        }`}
                        aria-hidden="true"
                      >
                        {selected && (
                          <span className="w-2 h-2 rounded-full bg-[#F7F3EA]" />
                        )}
                      </span>
                      <span className="text-[14px] font-medium leading-snug">
                        {t.inquiryModal.inquiryTypes[typeKey]}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Optional Note */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="inquiry-message"
                  className="block text-[14px] font-semibold text-[#263B30]"
                >
                  {t.inquiryModal.fields.messageLabel}
                </label>
                <span className="text-[12px] text-[#55634B] tabular-nums">
                  {t.inquiryModal.charsCount(
                    form.message.length,
                    INQUIRY_MAX_MESSAGE_LENGTH
                  )}
                </span>
              </div>
              <textarea
                id="inquiry-message"
                rows={3}
                maxLength={INQUIRY_MAX_MESSAGE_LENGTH}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder={t.inquiryModal.fields.messagePlaceholder}
                aria-invalid={Boolean(messageErrorText)}
                className={`w-full px-4 py-3 rounded-[12px] bg-[#F7F3EA] border text-[15px] leading-[1.6] text-[#1E2A23] placeholder:text-[#7A7467] focus:outline-none focus:ring-2 focus:ring-[#263B30] ${
                  messageErrorText ? 'border-[#9F3E34]' : 'border-[#D8C6AA]'
                }`}
              />
              {messageErrorText && (
                <p
                  role="alert"
                  data-testid="inquiry-error-message"
                  className="text-[13px] font-medium text-[#9F3E34]"
                >
                  {messageErrorText}
                </p>
              )}
            </div>

            {/* Step 1 Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="sm:w-auto"
              >
                {t.inquiryModal.actions.close}
              </Button>
              <Button
                type="submit"
                variant="primary"
                withArrow
                className="flex-1"
                data-testid="inquiry-preview-submit"
              >
                {t.inquiryModal.actions.previewMessage}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Final Message Preview */}
            <div className="space-y-2">
              <p className="text-[14px] font-semibold text-[#263B30]">
                {t.inquiryModal.previewLabel}
              </p>
              <pre
                data-testid="inquiry-message-preview"
                className="whitespace-pre-wrap break-words font-sans text-[15px] leading-[1.75] text-[#1E2A23] bg-[#F7F3EA] border border-[#D8C6AA] rounded-[16px] p-4 max-h-[260px] overflow-y-auto"
              >
                {previewMessage}
              </pre>
            </div>

            {/* Copy Action (Strictly separate from WhatsApp launch) */}
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleCopyMessage}
              data-testid="inquiry-copy-btn"
            >
              <span className="inline-flex items-center gap-2">
                {copied ? (
                  <Check className="w-4 h-4 text-[#2E5A36]" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4" aria-hidden="true" />
                )}
                <span>
                  {copied
                    ? t.inquiryModal.actions.copied
                    : t.inquiryModal.actions.copyMessage}
                </span>
              </span>
            </Button>

            {/* WhatsApp Open Action — ONLY active for non-demo, non-sold dogs with valid shop number & consent */}
            {actionState.reason === 'allowed' &&
            actionState.canOpenWhatsApp &&
            whatsappUrl ? (
              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-2.5 p-3 rounded-[12px] bg-[#F7F3EA] border border-[#D8C6AA] cursor-pointer text-[14px] leading-[1.55] text-[#1E2A23]">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    data-testid="inquiry-consent-checkbox"
                    className="mt-1 w-4 h-4 accent-[#263B30] rounded shrink-0"
                  />
                  <span>{t.inquiryModal.consentCheckbox}</span>
                </label>

                {consentChecked ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="inquiry-open-whatsapp-link"
                    className="w-full min-h-[48px] px-6 py-3 rounded-[12px] font-medium text-[15px] inline-flex items-center justify-center gap-2.5 bg-[#263B30] text-[#F7F3EA] hover:bg-[#1B2A22] transition-colors"
                  >
                    <MessageCircle
                      className="w-[18px] h-[18px] shrink-0"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span>{t.inquiryModal.actions.openWhatsApp}</span>
                  </a>
                ) : (
                  <Button
                    type="button"
                    variant="whatsapp"
                    fullWidth
                    disabled
                    data-testid="inquiry-open-whatsapp-disabled"
                  >
                    {t.inquiryModal.actions.openWhatsApp}
                  </Button>
                )}
              </div>
            ) : (
              <Button
                type="button"
                variant="secondary"
                fullWidth
                disabled
                data-testid="inquiry-whatsapp-blocked-btn"
                className="justify-center disabled:opacity-85 bg-[#EDE3D1]/70 border-[#D8C6AA] text-[#55634B]"
              >
                <span className="inline-flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{blockedButtonLabel}</span>
                </span>
              </Button>
            )}

            {/* Step 2 Navigation Footer */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#D8C6AA]/60">
              <button
                type="button"
                onClick={() => setStep(1)}
                data-testid="inquiry-back-btn"
                className="min-h-[44px] inline-flex items-center gap-2 text-[14px] font-medium text-[#263B30] hover:text-[#1B2A22] cursor-pointer"
              >
                <ArrowRight
                  className="w-4 h-4 ltr:rotate-180"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span>{t.inquiryModal.actions.editDetails}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-3 text-[14px] font-medium text-[#55634B] hover:text-[#263B30] cursor-pointer"
              >
                {t.inquiryModal.actions.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
