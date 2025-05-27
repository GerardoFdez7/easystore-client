'use client';

import { FormField } from '@molecules/shared/FormField';
import { Root, Submit } from '@radix-ui/react-form';
import { Button } from '@atoms/shared/ButtonCn';
import React from 'react';
import { useTranslations } from 'next-intl';
import LinkText from '@atoms/shared/LinkText';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export interface RegisterFormProps {
  onSubmit: (data: {
    fullName: string;
    phoneNumber: string;
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
      fullName: formData.get('fullName') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    });
    router.push('/register/confirm');
  };

  const handleGoogleRegister = () => {
    // TO DO: implement Google login
    console.log('Register with Google');
  };
  const handleFacebookRegister = () => {
    // TO DO: implement Facebook login
    console.log('Register with Facebook');
  };

  return (
    <Root
      onSubmit={handleSubmit}
      className="w-full max-w-xs space-y-4 sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <FormField
        name="fullName"
        label={t('fullName')}
        type="text"
        placeholder="John Doe"
      />

      <FormField
        name="phoneNumber"
        label={t('phoneNumber')}
        type="tel"
        placeholder="+1 234 567 890"
      />

      <FormField
        name="email"
        label={t('email')}
        type="email"
        placeholder="yourname@example.com"
      />

      <FormField
        name="password"
        label={t('password')}
        type="password"
        placeholder="••••••••"
      />

      <FormField
        name="confirmPassword"
        label={t('confirmPassword')}
        type="password"
        placeholder="••••••••"
      />

      <div className="flex justify-center">
        <Submit asChild>
          <Button variant="auth">{t('buttonRegister')}</Button>
        </Submit>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600">
          {t('alreadyHaveAccount')}{' '}
          <LinkText href="/login" className="text-secondary">
            {t('login')}
          </LinkText>
        </p>
      </div>

      <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Button variant={'social'} onClick={handleGoogleRegister}>
          <Image
            src="/icon_google.webp"
            alt="Email icon"
            width={24}
            height={24}
            className="mr-2 inline-block"
          />
          {t('registerWithGoogle')}
        </Button>
        <Button variant={'social'} onClick={handleFacebookRegister}>
          <Image
            src="/icon_facebook.webp"
            alt="Email icon"
            width={24}
            height={24}
            className="mr-2 inline-block"
          />
          {t('registerWithFacebook')}
        </Button>
      </div>
    </Root>
  );
};
