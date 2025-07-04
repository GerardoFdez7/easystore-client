import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MainRegister from '@organisms/register/MainRegister';
import { FormProvider, useForm } from 'react-hook-form';
import { IntlProvider } from 'next-intl';

const meta: Meta<typeof MainRegister> = {
  title: 'Organisms/Register/MainRegister',
  component: MainRegister,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MainRegister>;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <IntlProvider
      locale="en"
      messages={{
        Register: {
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          buttonRegister: 'Register',
          registerWithGoogle: 'Use Google',
          registerWithFacebook: 'Use Facebook',
          registerTitle: 'Register',
          registerMessage:
            'Create your account to start building your online store.',
          messageAccount: 'Already have an account?',
          login: 'Log in',
          invalidEmailFormat: 'Invalid email format',
          passwordTooShort: 'Password must be at least 8 characters',
          passwordTooLong: 'Password must be at most 255 characters',
          passwordsDoNotMatch: 'Passwords do not match',
          termsMessage: 'By continuing, you accept the',
          termsAndConditions: 'Terms and Conditions',
          and: 'and',
          privacyPolicy: 'Privacy Policy',
        },
        Login: {
          label: 'Already have an account? Log in',
        },
        Terms: {
          label: 'I accept the terms and conditions',
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
      <MainRegister />
    </Wrapper>
  ),
};
