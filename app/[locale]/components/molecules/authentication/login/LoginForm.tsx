'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLogin } from '@hooks/domains/authentication/useLogin';
import { AccountTypeEnum } from '@graphql/generated';
import { Form } from '@shadcn/ui/form';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import LoginFields from '@molecules/authentication/login/LoginFields';
import LinkToRegister from '@atoms/authentication/login/LinkToRegister';

interface LoginFormProps {
  accountType?: AccountTypeEnum;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  accountType = AccountTypeEnum.Tenant,
}) => {
  const t = useTranslations('Login');
  const { form, handleSubmit, loading } = useLogin(accountType);

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(handleSubmit)(e);
        }}
        className="w-full space-y-6 sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <LoginFields />
        <LinkToRegister />
        <ButtonLoadable
          type="submit"
          variant="auth"
          size="xl"
          className="w-full"
          loading={loading}
        >
          {t('buttonLogin')}
        </ButtonLoadable>
      </form>
    </Form>
  );
};

export default LoginForm;
