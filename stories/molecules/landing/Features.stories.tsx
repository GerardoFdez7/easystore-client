import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import Features from '@molecules/landing/Features';

const messages = {
  Landing: {
    featureTitle: 'Powerful features',
    featureText: 'Everything you need to sell online.',
    unlimetedProductsT: 'Unlimited products',
    unlimetedProducts: 'No hard caps on catalog size.',
    customDomainsT: 'Custom domains',
    customDomains: 'Bring your own domain easily.',
    paymantT: 'Payments',
    paymant: 'Accept major cards & wallets.',
    growBussinessT: 'Grow business',
    growBussiness: 'Insights and analytics built-in.',
    zeroTransactionT: '0% fees',
    zeroTransaction: 'Keep more of what you earn.',
    manageEaseT: 'Manage with ease',
    manageEase: 'Centralized dashboard for operations.',
    noCodeT: 'No-code',
    noCode: 'Launch without writing code.',
    sellEverywhereT: 'Sell everywhere',
    sellEverywhere: 'Web, social, and marketplaces.',
    searchEngineT: 'Search engine',
    searchEngine: 'Fast product search that converts.',
    inventorySyncT: 'Inventory sync',
    inventorySync: 'Keep stock consistent across channels.',
  },
};

const meta: Meta<typeof Features> = {
  title: 'Molecules/Landing/Features',
  component: Features,
};
export default meta;

type Story = StoryObj<typeof Features>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Features />
    </NextIntlClientProvider>
  ),
};
