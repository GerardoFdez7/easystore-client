'use client';

import Image from 'next/image';

const Logo = () => {
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
        src={'/logo.webp'}
        alt="Cart Icon"
        width={60}
        height={64}
        className="max-[580px]:h-[10vw] max-[580px]:w-[10vw]"
      />
      <span className="text-title text-[40px] font-extrabold max-[580px]:text-[6vw]">
        EasyStore
      </span>
    </div>
  );
};

export default Logo;
