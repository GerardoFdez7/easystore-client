import type { Meta, StoryObj } from '@storybook/nextjs';
import CashPaymentModal from '@molecules/billing/CashPaymentModal';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    CashPayment: {
      title: 'Cash Payments',
      description: 'Instructions and info for cash payments',
      infoTitle: 'Info',
      info1: 'Collect cash on delivery',
      info2: 'Provide receipt',
      info3: 'Confirm delivery',
      bestPracticesTitle: 'Best practices',
      bestPractice1: 'Train staff',
      bestPractice2: 'Record transactions',
      bestPractice3: 'Verify identity',
      cancel: 'Cancel',
      saveConfiguration: 'Save Configuration',
    },
  },
};

const meta: Meta<typeof CashPaymentModal> = {
  title: 'Molecules/Billing/CashPaymentModal',
  parameters: { layout: 'centered' },
  component: CashPaymentModal,
};
export default meta;

type Story = StoryObj<typeof CashPaymentModal>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <CashPaymentModal open={true} onOpenChange={() => {}} />
    </NextIntlClientProvider>
  ),
};
