'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';
import BackButton from '@atoms/shared/BackButton';
import LogoImage from '@atoms/shared/LogoImage';

export default function HeaderRegister() {
  const t = useTranslations('Register');

  return (
    <header className="px-4 py-6 sm:px-8 md:px-16 lg:px-32">
      <BackButton />
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 md:top-6 md:right-16">
        <LanguageButton />
      </div>

      <div className="mt-8 flex flex-col items-center justify-center text-center sm:mt-22 sm:flex-row sm:space-x-4 sm:text-left">
        <LogoImage
          width={140}
          height={140}
          className="h-20 w-20 sm:h-20 sm:w-20 md:h-28 md:w-28"
        />
        <div>
          <h1 className="text-title text-[42px] font-bold sm:mt-4">
            {t('registerTitle')}
          </h1>
          <p className="text-text text-primary max-w-md text-center text-lg font-medium sm:text-left">
            {t('registerMessage')}
          </p>
        </div>
      </div>
    </header>
  );
}
