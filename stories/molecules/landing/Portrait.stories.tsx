import type { Meta, StoryObj } from '@storybook/nextjs';
import Portrait from '@molecules/landing/Portrait';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Landing: {
    title: 'Build your store today',
    slogan: 'Everything you need to sell online.',
    buttonStartFree: 'Start free',
    buttonViewPlans: 'View plans',
  },
};

const meta: Meta<typeof Portrait> = {
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
    <NextIntlClientProvider locale="en" messages={messages}>
      <Portrait />
    </NextIntlClientProvider>
  ),
};
