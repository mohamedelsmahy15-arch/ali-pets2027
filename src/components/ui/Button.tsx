import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'icon';
type ButtonSize = 'lg' | 'md' | 'sm';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onDark?: boolean;
  fullWidth?: boolean;
  withArrow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type AsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type AsLink = BaseProps & {
  to: string;
  ariaLabel?: string;
};

export type ButtonProps = AsButton | AsLink;

const SIZE_CLASSES: Record<ButtonSize, string> = {
  lg: 'min-h-[56px] px-7 py-3.5 text-[16px]',
  md: 'min-h-[48px] px-6 py-3 text-[15px]',
  sm: 'min-h-[44px] px-4 py-2 text-[15px]',
};

function getVariantClasses(variant: ButtonVariant, onDark: boolean): string {
  switch (variant) {
    case 'primary':
      return onDark
        ? 'bg-[#F7F3EA] text-[#263B30] hover:bg-[#EDE3D1] border border-transparent'
        : 'bg-[#263B30] text-[#F7F3EA] hover:bg-[#1B2A22] border border-transparent';
    case 'secondary':
      return onDark
        ? 'bg-transparent text-[#F7F3EA] border border-[#D8C6AA]/60 hover:bg-[#F7F3EA]/10'
        : 'bg-transparent text-[#263B30] border border-[#263B30] hover:bg-[#EDE3D1]/70';
    case 'ghost':
      return onDark
        ? 'bg-transparent text-[#F7F3EA] hover:text-[#D8C6AA] px-2 border border-transparent'
        : 'bg-transparent text-[#263B30] hover:text-[#1B2A22] px-2 border border-transparent';
    case 'whatsapp':
      // Brand rule: WhatsApp CTA uses Forest Green, never bright WhatsApp green
      return onDark
        ? 'bg-[#F7F3EA] text-[#263B30] hover:bg-[#EDE3D1] border border-transparent'
        : 'bg-[#263B30] text-[#F7F3EA] hover:bg-[#1B2A22] border border-transparent';
    case 'icon':
      return onDark
        ? 'bg-transparent text-[#F7F3EA] hover:bg-[#F7F3EA]/10 border border-[#F7F3EA]/20 min-w-[44px] min-h-[44px] p-2.5'
        : 'bg-transparent text-[#263B30] hover:bg-[#EDE3D1] border border-[#D8C6AA] min-w-[44px] min-h-[44px] p-2.5';
  }
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    onDark = false,
    fullWidth = false,
    withArrow = false,
    className = '',
    children,
  } = props;

  const baseClasses = [
    'group inline-flex items-center justify-center gap-2.5 rounded-[12px] font-medium whitespace-nowrap shrink-0',
    'transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
    variant === 'icon' ? '' : SIZE_CLASSES[size],
    getVariantClasses(variant, onDark),
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {variant === 'whatsapp' && (
        <MessageCircle className="w-[18px] h-[18px] shrink-0" strokeWidth={1.6} aria-hidden="true" />
      )}
      <span>{children}</span>
      {withArrow && (
        <ArrowLeft
          className="w-4 h-4 shrink-0 transition-transform duration-200 ltr:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      )}
    </>
  );

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={baseClasses} aria-label={props.ariaLabel}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    onDark: _od,
    fullWidth: _fw,
    withArrow: _wa,
    className: _cn,
    children: _ch,
    type = 'button',
    ...rest
  } = props;

  return (
    <button type={type} className={baseClasses} {...rest}>
      {content}
    </button>
  );
}
