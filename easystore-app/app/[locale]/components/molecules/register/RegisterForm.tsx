'use client';

import { FormField } from '@components/molecules/shared/FormField';
import ButtonRegister from '@components/atoms/register/ButtonRegister';
import { Root, Submit } from '@radix-ui/react-form';
import React from 'react';
import { useTranslations } from 'next-intl';
import LinkText from '@components/atoms/shared/LinkText';
import { SocialButton } from '@atoms/shared/SocialButton';
import { useRouter } from 'next/navigation';

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
          <ButtonRegister />
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
        <SocialButton
          imageSrc="/icon_google.webp"
          imageAlt="Google icon"
          text={t('loginWithGoogle')}
          onClick={handleGoogleLogin}
        />
        <SocialButton
          imageSrc="/icon_facebook.webp"
          imageAlt="Facebook icon"
          text={t('loginWithFacebook')}
          onClick={handleFacebookLogin}
        />
      </div>
    </Root>
  );
};
