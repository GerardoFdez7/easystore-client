'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';

export default function HeaderRegister() {
  const t = useTranslations('Register');

  return (
    <header className="px-4 py-6 sm:px-8 md:px-16 lg:px-32">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 md:top-6 md:right-16">
        <LanguageButton />
      </div>

      <div className="mt-8 flex flex-col justify-center text-center sm:mt-22 sm:flex-row sm:space-x-4">
        <div>
          <h1 className="text-title text-4xl font-bold">
            {t('registerTitle')}
          </h1>
          <p className="text-primary mt-2 text-center text-lg font-medium">
            {t('registerMessage')}
          </p>
        </div>
      </div>
    </header>
  );
}
