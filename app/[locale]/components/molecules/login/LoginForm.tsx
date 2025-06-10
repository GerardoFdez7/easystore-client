'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Root, Submit } from '@radix-ui/react-form';
import { Button } from '@atoms/shared/Button';
import LoginFields from './LoginFields';
import LinkToRegister from '@molecules/login/LinkToRegister';

export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const t = useTranslations('Login');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  };

  return (
    <Root
      onSubmit={handleSubmit}
      className="w-full space-y-4 sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <LoginFields />
      <LinkToRegister />
      <Submit asChild>
        <Button variant="auth" size={'xl'}>
          {t('buttonLogin')}
        </Button>
      </Submit>
    </Root>
  );
};
