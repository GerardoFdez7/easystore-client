'use client';

import Image from 'next/image';
import { useRouter } from '@i18n/navigation';

type LogoProps = {
  redirectTo?: string;
  className?: string;
};

const Logo = ({ redirectTo, className }: LogoProps) => {
  const router = useRouter();

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
    <div
      className={`flex items-center ${redirectTo ? 'cursor-pointer' : ''} ${className || ''}`}
      onClick={redirectTo ? handleClick : undefined}
      role={redirectTo ? 'button' : undefined}
      aria-label={
        redirectTo ? 'Navigate to home or scroll to top' : 'EasyStore Logo'
      }
    >
      <Image
        src={'/logo.webp'}
        alt="EasyStore Logo"
        width={60}
        height={64}
        className={`max-[580px]:h-[10vw] max-[580px]:w-[10vw] ${className?.includes('text-') ? 'h-auto w-auto' : ''}`}
      />
      <span
        className={`text-title font-extrabold max-[580px]:text-[6vw] ${className?.includes('text-') ? className.split(' ').find((c) => c.startsWith('text-')) || 'text-[40px]' : 'text-[40px]'}`}
      >
        EasyStore
      </span>
    </div>
  );
};

export default Logo;
