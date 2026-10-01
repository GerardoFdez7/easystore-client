import React from 'react';
import { useTranslations } from 'next-intl';
import AuthenticationFormField from '@atoms/authentication/shared/AuthenticationFormField';

export const RegisterFields: React.FC = () => {
  const t = useTranslations('Register');

  return (
    <>
      <AuthenticationFormField name="email" label={t('email')} type="email" />
      <AuthenticationFormField
        name="password"
        label={t('password')}
        type="password"
      />
      <AuthenticationFormField
        name="confirmPassword"
        label={t('confirmPassword')}
        type="password"
      />
    </>
  );
};

export default RegisterFields;
