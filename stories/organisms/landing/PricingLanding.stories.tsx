import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PricingLanding from '@organisms/landing/PricingLanding';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';

const meta: Meta<typeof PricingLanding> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Plans & Pricing' }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Landing/PricingLanding',
  parameters: {
    layout: 'centered',
  },
  component: PricingLanding,
};
export default meta;

type Story = StoryObj<typeof PricingLanding>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={en}>
      <PricingLanding />
    </NextIntlClientProvider>
  ),
};
