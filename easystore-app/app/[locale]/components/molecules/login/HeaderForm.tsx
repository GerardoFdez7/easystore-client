'use client';
import React from 'react';
import LogoLogin from '@components/atoms/login/LogoLogin';
import { useTranslations } from 'next-intl';

export default function HeaderForm() {
  const t = useTranslations('Login');
  return (
    <section className="bg-background flex items-center justify-between px-4 py-6">
      <div className="flex-shrink-0">
        <LogoLogin />
      </div>

      <div className="text-right">
        <h1 className="text-title text-2xl font-bold">{t('welcomeBack')}</h1>
        <p className="text-text text-sm">{t('loginMessage')}</p>
      </div>
    </section>
  );
}
