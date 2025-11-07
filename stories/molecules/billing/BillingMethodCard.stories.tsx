import type { Meta, StoryObj } from '@storybook/nextjs';
import BillingMethodCard from '@molecules/billing/BillingMethodCard';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    MethodCard: {
      disabled: 'Disabled',
      configured: 'Configured',
      pendingSetup: 'Pending setup',
      manageSettings: 'Manage settings',
    },
  },
};

const meta: Meta<typeof BillingMethodCard> = {
  title: 'Molecules/Billing/BillingMethodCard',
  parameters: { layout: 'centered' },
  component: BillingMethodCard,
};
export default meta;

type Story = StoryObj<typeof BillingMethodCard>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <div style={{ width: 300 }}>
        <BillingMethodCard
          id="paypal"
          title="PayPal"
          description="Accept payments via PayPal"
          state="pending"
          enabled={true}
          onToggle={() => {}}
          onManage={() => {}}
        />
      </div>
    </NextIntlClientProvider>
  ),
};
