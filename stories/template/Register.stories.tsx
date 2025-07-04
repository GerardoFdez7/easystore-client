import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RegisterTemplate from '@templates/Register';
import { IntlProvider } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

const meta: Meta<typeof RegisterTemplate> = {
  title: 'Templates/Register',
  component: RegisterTemplate,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof RegisterTemplate>;

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
          registerTitle: 'Register',
          registerMessage:
            'Create your account to start building your online store.',
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          buttonRegister: 'Register',
          registerWithGoogle: 'Use Google',
          registerWithFacebook: 'Use Facebook',
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
        Terms: {
          label: 'I accept the terms and conditions',
        },
        Landing: {
          community: 'Community',
          termsConditions: 'Terms & Conditions',
          privacyPolicy: 'Privacy Policy',
          inc: '© 2025 EasyStore, Inc. All rights reserved',
        },
        Login: {
          label: 'Already have an account? Log in',
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
      <RegisterTemplate />
    </Wrapper>
  ),
};
