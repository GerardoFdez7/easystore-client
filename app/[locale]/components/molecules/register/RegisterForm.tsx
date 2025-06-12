'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRegister } from '@hooks/authentication';
import { Form } from '@shadcn/ui/form';
import RegisterFields from '@molecules/register/RegisterFields';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';

export const RegisterForm: React.FC = () => {
  const t = useTranslations('Register');
  const { form, handleSubmit, isLoading } = useRegister();

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(handleSubmit)(e);
        }}
        className="w-full space-y-4 sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <RegisterFields />

        <ButtonLoadable
          type="submit"
          variant="auth"
          size="xl"
          className="w-full"
          isLoading={isLoading}
        >
          {t('buttonRegister')}
        </ButtonLoadable>
      </form>
    </Form>
  );
};

export default RegisterForm;
