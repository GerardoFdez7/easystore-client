'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { cn } from '@lib/utils/cn';

export interface LogoProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  labelClassName?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
  src,
  alt,
  width = 60,
  height = 64,
  label = '',
  className = '',
  labelClassName = 'text-title text-[40px] font-extrabold',
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      role="button"
      aria-label="logo"
      onClick={handleClick}
      className={cn('flex cursor-pointer items-center', className)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="max-[580px]:h-[10vw] max-[580px]:w-[10vw]"
      />
      {label && (
        <span className={cn(labelClassName, 'max-[580px]:text-[6vw]')}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Logo;
