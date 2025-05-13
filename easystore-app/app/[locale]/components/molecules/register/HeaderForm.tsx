'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function HeaderForm() {
  const t = useTranslations('Register');
  return (
    <section className="bg-background flex items-center justify-between px-4 py-8">
      <div className="text-center">
        <h1 className="text-title text-2xl font-bold">{t('registerTitle')}</h1>
        <p className="text-text text-sm">{t('registerMessage')}</p>
      </div>
    </section>
  );
}
