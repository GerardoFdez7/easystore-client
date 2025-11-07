import type { Meta, StoryObj } from '@storybook/nextjs';
import InstallmentsModal from '@molecules/billing/InstallmentsModal';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    Installments: {
      title: 'Installments',
      description: 'Configure installment payment options',
      enableInstallments: 'Enable installments',
      enableInstallmentsDescription: 'Allow customers to split payments',
      minAmount: 'Minimum amount',
      maxInstallments: 'Max installments',
      interestRate: 'Interest rate',
      cancel: 'Cancel',
      saveConfiguration: 'Save Configuration',
    },
  },
};

const meta: Meta<typeof InstallmentsModal> = {
  title: 'Molecules/Billing/InstallmentsModal',
  parameters: { layout: 'centered' },
  component: InstallmentsModal,
};
export default meta;

type Story = StoryObj<typeof InstallmentsModal>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <InstallmentsModal open={true} onOpenChange={() => {}} />
    </NextIntlClientProvider>
  ),
};
