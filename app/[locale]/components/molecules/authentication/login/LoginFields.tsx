import React from 'react';
import { useTranslations } from 'next-intl';
import AuthenticationFormField from '@atoms/authentication/shared/AuthenticationFormField';

export const LoginFields: React.FC = () => {
  const t = useTranslations('Login');

  return (
    <>
      <AuthenticationFormField name="email" label={t('email')} type="email" />
      <AuthenticationFormField
        name="password"
        label={t('password')}
        type="password"
        revealable
      />
    </>
  );
};

export default LoginFields;
