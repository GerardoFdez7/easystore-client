'use client';

import { FormField } from '../shared/FormField';
import { Form } from '@components/atoms/shared/Form';
import ButtonLogin from '@components/atoms/login/ButtonLogin';
import React from 'react';
import { useTranslations } from 'next-intl';
import LinkText from '@components/atoms/shared/LinkText';
import SocialButton from '@components/atoms/shared/SocialButton';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

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
    <Form.Root
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

      <Form.Submit asChild>
        <ButtonLogin />
      </Form.Submit>

      <div className="text-center">
        <LinkText href="" className="">
          {t('ChangePassword')}
        </LinkText>
      </div>

      <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <SocialButton
          icon={<FaGoogle />}
          text={t('loginWithGoogle')}
          onClick={handleGoogleLogin}
          className="w-full bg-[#EBDBF5] text-black sm:w-auto"
        />
        <SocialButton
          icon={<FaFacebookF />}
          text={t('loginWithFacebook')}
          onClick={handleFacebookLogin}
          className="w-full bg-[#EBDBF5] text-black sm:w-auto"
        />
      </div>
    </Form.Root>
  );
};
