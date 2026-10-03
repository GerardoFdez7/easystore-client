'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from '@i18n/navigation';

type LogoProps = {
  redirectTo?: string;
  className?: string;
};

const Logo = ({ redirectTo, className }: LogoProps) => {
  const router = useRouter();
  const t = useTranslations('Shared');

  const handleClick = () => {
    // Always scroll to top first
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Then navigate to the specified destination if redirectTo is provided
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <button
      type="button"
      className={`flex items-center ${redirectTo ? 'cursor-pointer' : ''} ${className || ''}`}
      onClick={handleClick}
      aria-label={t('logoLabel')}
    >
      <Image
        src={'/logo.svg'}
        alt={t('logoAlt')}
        width={60}
        height={64}
        className={`max-[580px]:size-logo-icon ${className?.includes('text-') ? 'h-auto w-auto' : ''}`}
      />
      <span
        className={`text-title max-[580px]:text-logo-sm font-extrabold ${className?.includes('text-') ? className.split(' ').find((c) => c.startsWith('text-')) || 'text-logo' : 'text-logo'}`}
      >
        EasyStore
      </span>
    </button>
  );
};

export default Logo;
