import type { Meta, StoryObj } from '@storybook/nextjs';
import MainRegister from '@organisms/register/MainRegister';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Register: {
    registerTitle: 'Create your EasyStore account',
    registerMessage:
      "Start selling in minutes \u2014 it's free to get started.",
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    buttonRegister: 'Create account',
    termsMessage: 'By continuing, you agree to the',
    termsAndConditions: 'Terms & Conditions',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    messageAccount: 'Already have an account?',
    login: 'Log in',
  },
  Languages: {
    English: 'English',
    Spanish: 'Spanish',
    French: 'French',
    Italian: 'Italian',
    Portuguese: 'Portuguese',
  },
};

const meta: Meta<typeof MainRegister> = {
  title: 'Organisms/Register/MainRegister',
  parameters: {
    layout: 'fullscreen',
  },
  component: MainRegister,
};
export default meta;

type Story = StoryObj<typeof MainRegister>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={{ ...messages }}>
      <MainRegister />
    </NextIntlClientProvider>
  ),
};
