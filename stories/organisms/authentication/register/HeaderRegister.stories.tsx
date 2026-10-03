import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderRegister from '@organisms/authentication/register/HeaderRegister';
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
    Portuguese: 'Portuguese',
  },
};

const meta: Meta<typeof HeaderRegister> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', {
        level: 1,
        name: 'Create your EasyStore account',
      }),
    ).toBeVisible();
    await storybookExpect(
      canvas.getByText(
        "Start selling in minutes \u2014 it's free to get started.",
      ),
    ).toBeVisible();
  },
  title: 'Organisms/Authentication/Register/HeaderRegister',
  parameters: {
    layout: 'fullscreen',
  },
  component: HeaderRegister,
};
export default meta;

type Story = StoryObj<typeof HeaderRegister>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={{ ...messages }}>
      <HeaderRegister />
    </NextIntlClientProvider>
  ),
};
