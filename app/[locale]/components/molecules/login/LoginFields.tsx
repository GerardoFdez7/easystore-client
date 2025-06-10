import React from 'react';
import { useTranslations } from 'next-intl';
import { FormField } from '@molecules/shared/FormField';

export const LoginFields: React.FC = () => {
  const t = useTranslations('Login');

  return (
    <>
      <FormField name="email" label={t('email')} type="email" />

      <FormField name="password" label={t('password')} type="password" />
    </>
  );
};

export default LoginFields;
