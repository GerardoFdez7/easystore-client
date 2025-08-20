import type { Meta, StoryObj } from '@storybook/nextjs';
import Start from '@molecules/landing/Start';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Landing: {
    starting: 'Get started in minutes',
    addYourProducts: 'Add your products',
    customizeYourStore: 'Customize your store',
    setUpdPayments: 'Set up payments',
  },
};

const meta: Meta<typeof Start> = {
  title: 'Molecules/Landing/Start',
  parameters: {
    layout: 'centered',
  },
  component: Start,
};
export default meta;

type Story = StoryObj<typeof Start>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Start />
    </NextIntlClientProvider>
  ),
};
