'use client';

import React from 'react';
import LogoImage from '@atoms/shared/LogoImage';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Login');

  return (
    <header className="bg-background relative mt-4 px-4 py-6 sm:px-8 md:px-16 lg:px-32">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 md:top-6 md:right-16">
        <LanguageButton />
      </div>

      <div className="flex flex-col items-center justify-center space-y-0 text-center sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left">
        <LogoImage
          width={120}
          height={120}
          className="mb-4 h-16 w-16 sm:mb-0 sm:h-20 sm:w-20 md:h-22 md:w-22"
        />
        <div>
          <h1 className="text-title text-2xl font-extrabold sm:text-3xl md:text-4xl">
            {t('welcomeBack')}
          </h1>
          <p className="text-text text-primary text-sm sm:text-base md:text-lg">
            {t('loginMessage')}
          </p>
        </div>
      </div>
    </header>
  );
}
