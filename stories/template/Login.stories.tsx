import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LoginTemplate from '@templates/Login';
import { IntlProvider } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof LoginTemplate> = {
  title: 'Templates/Login',
  component: LoginTemplate,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof LoginTemplate>;

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
          welcomeBack: 'Welcome Back!',
          loginMessage: 'Log in to access your EasyStore account.',
          email: 'Email',
          password: 'Password',
          buttonLogin: 'Log in',
          changePassword: 'Forgot password?',
          messageAccount: "Don't have an account?",
          register: 'Register',
          invalidEmailFormat: 'Invalid email format',
          passwordTooShort: 'Password must be at least 8 characters',
          passwordTooLong: 'Password must be at most 255 characters',
        },
        Register: {
          registerWithGoogle: 'Use Google',
          registerWithFacebook: 'Use Facebook',
        },
        ForgotPassword: {
          label: 'Forgot your password?',
        },
        Terms: {
          label: 'I accept the terms and conditions',
        },
        Landing: {
          community: 'Community',
          termsConditions: 'Terms & Conditions',
          privacyPolicy: 'Privacy Policy',
          inc: '© 2025 EasyStore, Inc. All rights reserved',
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
      <LoginTemplate />
    </Wrapper>
  ),
};
