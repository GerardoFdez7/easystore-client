'use client';

import { useTranslations } from 'next-intl';
import AuthenticationHeader from '@molecules/authentication/shared/AuthenticationHeader';

export default function Header() {
  const t = useTranslations('Login');

  return (
    <AuthenticationHeader
      title={t('welcomeBack')}
      description={t('loginMessage')}
    />
  );
}
