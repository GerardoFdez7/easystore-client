'use client';
import React from 'react';
import LogoLogin from '@components/atoms/login/LogoLogin';
import { useTranslations } from 'next-intl';

export default function HeaderForm() {
  const t = useTranslations('Login');
  return (
    <section className="flex flex-col items-center justify-between px-4 sm:flex-row sm:px-8 md:px-16 lg:px-32">
      <div className="flex items-center space-x-4">
        <LogoLogin />
        <div className="text-center sm:text-left">
          <h1 className="text-title text-2xl font-extrabold sm:text-3xl md:text-4xl">
            {t('welcomeBack')}
          </h1>
          <p className="text-text text-sm sm:text-base md:text-lg">
            {t('loginMessage')}
          </p>
        </div>
      </div>
    </section>
  );
}
