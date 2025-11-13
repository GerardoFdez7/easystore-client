import type { Meta, StoryObj } from '@storybook/nextjs';
import BankTransferModal from '@molecules/billing/BankTransferModal';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    BankTransfer: {
      title: 'Bank Transfer',
      description: 'Configure bank transfer details',
      bankName: 'Bank name',
      bankNamePlaceholder: 'Enter bank name',
      accountHolder: 'Account holder',
      accountHolderPlaceholder: 'Enter account holder',
      accountNumber: 'Account number',
      accountNumberPlaceholder: 'Enter account number',
      swift: 'SWIFT/BIC',
      swiftPlaceholder: 'Enter SWIFT/BIC',
      swiftHint: 'International bank code',
      instructions: 'Instructions',
      instructionsPlaceholder: 'Payment instructions',
      instructionsHint: 'Additional instructions',
      requireProof: 'Require proof',
      requireProofDescription: 'Require proof of payment for reconciliation',
      infoTitle: 'Info',
      info1: 'Bank transfer may take 1-3 business days',
      info2: 'Provide correct account details',
      info3: 'Keep proof of payment',
      cancel: 'Cancel',
      saveConfiguration: 'Save Configuration',
    },
  },
};

const meta: Meta<typeof BankTransferModal> = {
  title: 'Molecules/Billing/BankTransferModal',
  parameters: { layout: 'centered' },
  component: BankTransferModal,
};
export default meta;

type Story = StoryObj<typeof BankTransferModal>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <BankTransferModal open={true} onOpenChange={() => {}} />
    </NextIntlClientProvider>
  ),
};
