import type { Meta, StoryObj } from '@storybook/react';
import SocialAuthButtons from '@molecules/shared/SocialAuthButtons';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Register: {
    registerWithGoogle: 'Register with Google',
    registerWithFacebook: 'Register with Facebook',
  },
};

const meta: Meta<typeof SocialAuthButtons> = {
  title: 'Molecules/Shared/SocialAuthButtons',
  component: SocialAuthButtons,
};
export default meta;

type Story = StoryObj<typeof SocialAuthButtons>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <SocialAuthButtons />
    </NextIntlClientProvider>
  ),
};
