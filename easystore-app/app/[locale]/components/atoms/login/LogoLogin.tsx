'use client';

import React from 'react';
import Logo from '@components/atoms/shared/Logo';

export default function LogoLogin() {
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Logo
        src="/logo.webp"
        alt="EasyStore Logo"
        label=""
        width={85}
        height={85}
        className="mb-8 h-16 w-full object-contain sm:h-20 sm:w-20"
        labelClassName="text-2xl font-bold text-gray-900"
      />
    </div>
  );
}
