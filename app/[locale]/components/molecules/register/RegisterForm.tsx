'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Root, Submit } from '@radix-ui/react-form';
import RegisterFields from '@molecules/register/RegisterFields';
import { Button } from '@shadcn/ui/button';

export interface RegisterFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const t = useTranslations('Register');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    });
    router.push('/login');
  };

  return (
    <Root
      onSubmit={handleSubmit}
      className="mt-4 w-full space-y-4 sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <RegisterFields />

      <Submit asChild>
        <Button variant="auth" size={'xl'}>
          {t('buttonRegister')}
        </Button>
      </Submit>
    </Root>
  );
};

export default RegisterForm;
