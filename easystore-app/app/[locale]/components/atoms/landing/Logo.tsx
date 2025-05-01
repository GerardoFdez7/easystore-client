'use client';

import Image from 'next/image';
import logo from '@assets/logo.webp';

export const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="flex cursor-pointer items-center"
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to top"
    >
      <Image
        src={logo}
        alt="Cart Icon"
        className="max-[580px]:h-[10vw] max-[580px]:w-[10vw]"
      />
      <span className="text-title text-[40px] font-extrabold max-[580px]:text-[6vw]">
        EasyStore
      </span>
    </div>
  );
};
