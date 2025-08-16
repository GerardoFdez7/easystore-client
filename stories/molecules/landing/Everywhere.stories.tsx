import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import Everywhere from '@molecules/landing/Everywhere';

const messages = {
  Landing: {
    everyWhereTitle: 'Sell everywhere',
    everyWhereText: 'Your storefront adapts to any device.',
  },
};

const meta: Meta<typeof Everywhere> = {
  title: 'Molecules/Landing/Everywhere',
  component: Everywhere,
};
export default meta;

type Story = StoryObj<typeof Everywhere>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Everywhere />
    </NextIntlClientProvider>
  ),
};
