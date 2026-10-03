import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SocialAuthButtons from '@molecules/shared/SocialAuthButtons';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';

const messages = {
  Register: {
    registerWithGoogle: 'Register with Google',
    registerWithFacebook: 'Register with Facebook',
  },
};

const meta: Meta<typeof SocialAuthButtons> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Register with Google' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Register with Facebook' }),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Shared/SocialAuthButtons',
  parameters: {
    layout: 'centered',
  },
  component: SocialAuthButtons,
};
export default meta;

type Story = StoryObj<typeof SocialAuthButtons>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <SocialAuthButtons />
    </NextIntlClientProvider>
  ),
};
