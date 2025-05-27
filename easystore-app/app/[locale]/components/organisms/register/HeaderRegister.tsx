'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { LanguageButton } from '@components/atoms/shared/ButtonLanguage';

export default function HeaderRegister() {
  const t = useTranslations('Register');

  return (
    <header className="bg-background relative mt-4 px-4 py-6 sm:px-8 md:px-16 lg:px-32">
      {/* Botón de idioma en top-right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 md:top-6 md:right-16">
        <LanguageButton />
      </div>

      {/* Contenido centrado */}
      <div className="flex flex-col items-center justify-center space-y-0 text-center sm:flex-row sm:space-y-0 sm:space-x-4 sm:text-left">
        <div>
          <h1 className="text-title text-2xl font-extrabold sm:text-3xl md:text-4xl">
            {t('registerTitle')}
          </h1>
          <p className="text-text text-primary text-center text-sm sm:text-base md:text-lg">
            {t('registerMessage')}
          </p>
        </div>
      </div>
    </header>
  );
}
