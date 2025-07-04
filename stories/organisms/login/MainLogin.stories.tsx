import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MainLogin from '@organisms/login/MainLogin';
import { IntlProvider } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof MainLogin> = {
  title: 'Organisms/Login/MainLogin',
  component: MainLogin,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MainLogin>;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <IntlProvider
      locale="en"
      messages={{
        Login: {
          email: 'Email',
          password: 'Password',
          buttonLogin: 'Log in',
          welcomeBack: 'Welcome Back!',
          loginMessage: 'Log in to access your EasyStore account.',
          changePassword: 'Forgot password?',
          loginWithGoogle: 'Use Google',
          loginWithFacebook: 'Use Facebook',
          messageAccount: "Don't have an account?",
          register: 'Register',
          invalidEmailFormat: 'Invalid email format',
          passwordTooShort: 'Password must be at least 8 characters',
          passwordTooLong: 'Password must be at most 255 characters',
        },
        Register: {
          registerWithGoogle: 'Register with Google',
          registerWithFacebook: 'Register with Facebook',
        },
        ForgotPassword: {
          label: 'Forgot your password?',
        },
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </IntlProvider>
  );
};

export const Default: Story = {
  render: () => (
    <Wrapper>
      <MainLogin />
    </Wrapper>
  ),
};
