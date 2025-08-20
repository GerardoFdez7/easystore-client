import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import FAQs from '@molecules/landing/FAQs';

const messages = {
  Landing: {
    FAQsTitle: 'FAQs',
    whatIsEasyStoreTitle: 'What is EasyStore?',
    whatIsEasyStore: 'A simple platform to sell online.',
    EasyStoreCostTitle: 'How much does it cost?',
    EasyStoreCost: 'We offer simple, transparent plans.',
    cancelAccountTitle: 'Can I cancel anytime?',
    cancelAccount: 'Yes, you can cancel whenever you want.',
    changePlanTitle: 'Can I change plans?',
    changePlan: 'Upgrade or downgrade at any time.',
    dicountsTitle: 'Do you offer discounts?',
    dicounts: 'Occasional promos may apply.',
    countriesUseTitle: 'Where can I use it?',
    countriesUse: 'Available in many countries.',
    transactionTitle: 'Transaction fees?',
    transaction: 'We do not take transaction fees.',
    switchToEasyStoreTitle: 'Switching help?',
    switchToEasyStore: 'Guides and importers available.',
    domainNameTitle: 'Custom domain?',
    domainName: 'Yes, connect your own domain.',
    hostingTitle: 'Hosting included?',
    hosting: 'Yes, fully managed hosting.',
    onlineStoreTitle: 'Create an online store?',
    onlineStore: 'Yes, create and manage your store easily.',
  },
};

const meta: Meta<typeof FAQs> = {
  title: 'Molecules/Landing/FAQs',
  parameters: {
    layout: 'centered',
  },
  component: FAQs,
};
export default meta;

type Story = StoryObj<typeof FAQs>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <FAQs />
    </NextIntlClientProvider>
  ),
};
