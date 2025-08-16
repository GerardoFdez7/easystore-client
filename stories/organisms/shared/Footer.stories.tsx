import type { Meta, StoryObj } from '@storybook/react';
import Footer from '@organisms/shared/Footer';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Landing: {
    community: 'Community',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    inc: '\u00a9 2025 EasyStore, Inc. All rights reserved',
  },
};

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Shared/Footer',
  component: Footer,
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={{ ...messages }}>
      <Footer />
    </NextIntlClientProvider>
  ),
};
