import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Start from '@molecules/landing/Start';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';

const messages = {
  Landing: {
    starting: 'Get started in minutes',
    addYourProducts: 'Add your products',
    customizeYourStore: 'Customize your store',
    setUpdPayments: 'Set up payments',
  },
};

const meta: Meta<typeof Start> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('heading', { name: 'Get started in minutes' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Set up payments'),
    ).toBeInTheDocument();
  },
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
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <Start />
    </NextIntlClientProvider>
  ),
};
