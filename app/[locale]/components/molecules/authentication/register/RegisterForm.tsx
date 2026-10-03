'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRegister } from '@hooks/domains/authentication';
import { Form } from '@shadcn/ui/form';
import RegisterFields from '@molecules/authentication/register/RegisterFields';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import { AccountType } from '@lib/types/authentication';

interface RegisterFormProps {
  accountType?: AccountType;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  accountType = AccountType.Tenant,
}) => {
  const t = useTranslations('Register');
  const { form, handleSubmit, loading } = useRegister(accountType);

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
          loading={loading}
        >
          {t('buttonRegister')}
        </ButtonLoadable>
      </form>
    </Form>
  );
};

export default RegisterForm;
