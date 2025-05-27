'use client';

import { FormField } from '../shared/FormField';
import { Root, Submit } from '@radix-ui/react-form';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@components/atoms/shared/ButtonCn';
import LinkText from '@components/atoms/shared/LinkText';
import Image from 'next/image';

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

  const handleGoogleLogin = () => {
    // TO DO: implement Google login
    console.log('Login with Google');
  };
  const handleFacebookLogin = () => {
    // TO DO: implement Facebook login
    console.log('Login with Facebook');
  };

  return (
    <Root
      onSubmit={handleSubmit}
      className="w-full max-w-xs space-y-4 sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
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

      <div className="text-center">
        <p className="text-sm text-gray-600">
          {t('MessageAccount')}{' '}
          <LinkText href="/register" className="text-secondary">
            {t('Register')}
          </LinkText>
        </p>
      </div>
      <div className="flex justify-center">
        <Submit asChild>
          <Button variant="auth">{t('buttonLogin')}</Button>
        </Submit>
      </div>

      <div className="text-center">
        <LinkText href="" className="">
          {t('ChangePassword')}
        </LinkText>
      </div>

      <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Button variant="social" onClick={handleGoogleLogin}>
          <Image
            src="/icon_google.webp"
            alt="Google"
            width={24}
            height={24}
            className="mr-2 inline-block"
          />
          {t('loginWithGoogle')}
        </Button>

        <Button variant="social" onClick={handleFacebookLogin}>
          <Image
            src="/icon_facebook.webp"
            alt="Facebook"
            width={24}
            height={24}
            className="mr-2 inline-block"
          />
          {t('loginWithFacebook')}
        </Button>
      </div>
    </Root>
  );
};
