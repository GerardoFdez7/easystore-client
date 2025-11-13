import type { Meta, StoryObj } from '@storybook/nextjs';
import CODModal from '@molecules/billing/CODModal';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    COD: {
      title: 'Cash on Delivery (COD)',
      description: 'Configure COD options',
      extraFee: 'Extra fee',
      extraFeeHint: 'Optional service charge',
      maxAmount: 'Maximum order amount',
      maxAmountHint: 'Limit orders eligible for COD',
      deliveryInstructions: 'Delivery instructions',
      deliveryInstructionsPlaceholder: 'Special instructions for delivery',
      deliveryInstructionsHint: 'Instructions shown to courier',
      partialPayment: 'Allow partial payment',
      partialPaymentDescription: 'Allow customers to pay part now',
      phoneVerification: 'Require phone verification',
      phoneVerificationDescription: 'Verify phone at delivery',
      bestPracticesTitle: 'Best practices',
      bestPractice1: 'Confirm address',
      bestPractice2: 'Collect ID',
      bestPractice3: 'Use tracking',
      bestPractice4: 'Train delivery staff',
      cancel: 'Cancel',
      saveConfiguration: 'Save Configuration',
    },
  },
};

const meta: Meta<typeof CODModal> = {
  title: 'Molecules/Billing/CODModal',
  parameters: { layout: 'centered' },
  component: CODModal,
};
export default meta;

type Story = StoryObj<typeof CODModal>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <CODModal open={true} onOpenChange={() => {}} />
    </NextIntlClientProvider>
  ),
};
