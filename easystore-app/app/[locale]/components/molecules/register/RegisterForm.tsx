'use client';

import { FormField } from '@components/molecules/shared/FormField';
import { Form } from '@components/atoms/shared/Form';
import ButtonRegister from '@components/atoms/register/ButtonRegister';
import React from 'react';
import { useTranslations } from 'next-intl';
import LinkText from '@components/atoms/shared/LinkText';
import SocialButton from '@components/atoms/shared/SocialButton';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

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
    <Form.Root onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
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

      <Form.Submit asChild>
        <ButtonRegister />
      </Form.Submit>

      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600">
          {t('alreadyHaveAccount')}{' '}
          <LinkText href="/login" className="text-secondary">
            {t('login')}
          </LinkText>
        </p>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <SocialButton
          icon={<FaGoogle />}
          text={t('registerWithGoogle')}
          onClick={handleGoogleLogin}
          className="bg-[#EBDBF5] text-black"
        />
        <SocialButton
          icon={<FaFacebookF />}
          text={t('registerWithFacebook')}
          onClick={handleFacebookLogin}
          className="bg-[#EBDBF5] text-black"
        />
      </div>
    </Form.Root>
  );
};
