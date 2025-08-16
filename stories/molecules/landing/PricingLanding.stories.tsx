import type { Meta, StoryObj } from '@storybook/react';
import PricingLanding from '@molecules/landing/PricingLanding';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';

const meta: Meta<typeof PricingLanding> = {
  title: 'Molecules/Landing/PricingLanding',
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
