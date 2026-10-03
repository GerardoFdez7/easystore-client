import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import Everywhere from '@molecules/landing/Everywhere';

const messages = {
  Landing: {
    everyWhereTitle: 'Sell everywhere',
    everyWhereText: 'Your storefront adapts to any device.',
  },
};

const meta: Meta<typeof Everywhere> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('heading', { name: 'Sell everywhere' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Your storefront adapts to any device.'),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Landing/Everywhere',
  parameters: {
    layout: 'centered',
  },
  component: Everywhere,
};
export default meta;

type Story = StoryObj<typeof Everywhere>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <Everywhere />
    </NextIntlClientProvider>
  ),
};
