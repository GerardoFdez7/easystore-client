'use client';

import Image from 'next/image';
import { useRouter } from '@i18n/navigation';

type LogoProps = {
  redirectTo: string;
};

const Logo = ({ redirectTo }: LogoProps) => {
  const router = useRouter();

  const handleClick = () => {
    // Always scroll to top first
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Then navigate to the specified destination
    router.push(redirectTo);
  };

  return (
    <div
      className="flex cursor-pointer items-center"
      onClick={handleClick}
      role="button"
      aria-label="Navigate to home or scroll to top"
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
