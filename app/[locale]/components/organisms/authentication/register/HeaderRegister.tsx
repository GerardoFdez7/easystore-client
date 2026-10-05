'use client';

import { useTranslations } from 'next-intl';
import AuthenticationHeader from '@molecules/authentication/shared/AuthenticationHeader';

export default function HeaderRegister() {
  const t = useTranslations('Register');

  return (
    <AuthenticationHeader
      title={t('registerTitle')}
      description={t('registerMessage')}
      descriptionClassName="max-w-md text-center sm:text-left"
    />
  );
}
