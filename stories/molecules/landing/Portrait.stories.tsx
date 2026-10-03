import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Portrait from '@molecules/landing/Portrait';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';

const messages = {
  Landing: {
    title: 'Build your store today',
    slogan: 'Everything you need to sell online.',
    buttonStartFree: 'Start free',
    buttonViewPlans: 'View plans',
  },
};

const meta: Meta<typeof Portrait> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('heading', { name: 'Build your store today' }),
    ).toBeInTheDocument();
    // Authenticated visitors do not get the sign-up call to action.
    await storybookExpect(
      canvas.queryByRole('button', { name: 'Start free' }),
    ).toBeNull();
    await storybookExpect(
      canvas.getByRole('link', { name: 'View plans' }),
    ).toHaveAttribute('href', '#plans');
  },
  title: 'Molecules/Landing/Portrait',
  parameters: {
    layout: 'centered',
  },
  component: Portrait,
};
export default meta;

type Story = StoryObj<typeof Portrait>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <Portrait />
    </NextIntlClientProvider>
  ),
};
