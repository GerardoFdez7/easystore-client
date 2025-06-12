'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLogin } from '@hooks/authentication/useLogin';
import { Form } from '@shadcn/ui/form';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import LoginFields from '@molecules/login/LoginFields';
import LinkToRegister from '@atoms/login/LinkToRegister';

export const LoginForm: React.FC = () => {
  const t = useTranslations('Login');
  const { form, handleSubmit, isLoading } = useLogin();

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
          isLoading={isLoading}
        >
          {t('buttonLogin')}
        </ButtonLoadable>
      </form>
    </Form>
  );
};

export default LoginForm;
