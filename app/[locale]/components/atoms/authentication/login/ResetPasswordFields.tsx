import React from 'react';
import { useTranslations } from 'next-intl';
import AuthenticationFormField from '@atoms/authentication/shared/AuthenticationFormField';

export const ResetPasswordFields: React.FC = () => {
  const t = useTranslations('ResetPassword');

  return (
    <>
      <AuthenticationFormField
        name="password"
        label={t('password')}
        type="password"
        revealable
      />
      <AuthenticationFormField
        name="confirmPassword"
        label={t('confirmPassword')}
        type="password"
        revealable
      />
    </>
  );
};

export default ResetPasswordFields;
