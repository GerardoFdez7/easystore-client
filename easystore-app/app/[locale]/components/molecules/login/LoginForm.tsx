'use client';

import { FormField } from '../shared/FormField';
import { Form } from '@components/atoms/shared/Form';
import ButtonLogin from '@components/atoms/login/ButtonLogin';
import React from 'react';
import { useTranslations } from 'next-intl';
import LinkText from '@components/atoms/shared/LinkText';

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
    <Form.Root onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <FormField
        name="email"
        label={t('email')}
        type="email"
        placeholder="tucorreo@ejemplo.com"
      />

      <FormField
        name="password"
        label={t('password')}
        type="password"
        placeholder="••••••••"
      />

      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600">
          {t('MessageAccount')}{' '}
          <LinkText href="/register" className="text-secondary">
            {t('Register')}
          </LinkText>
        </p>
      </div>

      <Form.Submit asChild>
        <ButtonLogin />
      </Form.Submit>

      <div className="flex flex-col items-center">
        <LinkText href="/register" className="">
          {t('ChangePassword')}
        </LinkText>
      </div>
    </Form.Root>
  );
};
