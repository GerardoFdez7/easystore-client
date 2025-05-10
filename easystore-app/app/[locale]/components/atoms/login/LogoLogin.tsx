'use client';

import React from 'react';
import Logo from '@components/atoms/shared/Logo';

export default function LogoLogin() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Logo
        src="/logo.webp"
        alt="EasyStore Logo"
        label="EasyStore"
        width={72}
        height={72}
        className="mb-8"
        labelClassName="text-2xl font-bold text-gray-900"
      />
    </div>
  );
}
