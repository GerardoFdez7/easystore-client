import React from 'react';
import { useTranslations } from 'next-intl';
import { FormField } from '@molecules/shared/FormField';

export const RegisterFields: React.FC = () => {
  const t = useTranslations('Register');

  return (
    <>
      <FormField name="email" label={t('email')} type="email" />
      <FormField name="password" label={t('password')} type="password" />
      <FormField
        name="confirmPassword"
        label={t('confirmPassword')}
        type="password"
      />
    </>
  );
};

export default RegisterFields;
