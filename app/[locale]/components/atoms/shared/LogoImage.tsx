// shared/LogoImage.tsx
'use client';

import Image, { ImageProps } from 'next/image';
import React from 'react';

type LogoImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src?: string;
  alt?: string;
};

export default function LogoImage({
  src = '/logo.webp',
  alt = 'EasyStore Logo',
  ...props
}: LogoImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      className={`object-contain ${props.className ?? ''}`}
    />
  );
}
