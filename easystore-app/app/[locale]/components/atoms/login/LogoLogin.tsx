'use client';

import React from 'react';
import Logo from '@components/atoms/shared/Logo';

export default function LogoLogin() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Logo
        src="/logo.webp"
        alt="EasyStore Logo"
        label=""
        width={85}
        height={85}
        className="mb-8"
        labelClassName="text-2xl font-bold text-gray-900"
      />
    </div>
  );
}
