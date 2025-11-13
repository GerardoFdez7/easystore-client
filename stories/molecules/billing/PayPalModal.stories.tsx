import type { Meta, StoryObj } from '@storybook/nextjs';
import PayPalModal from '@molecules/billing/PayPalModal';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    PayPal: {
      title: 'PayPal Configuration',
      description: 'Configure your PayPal API credentials',
      clientId: 'Client ID',
      clientIdPlaceholder: 'Enter your PayPal Client ID',
      clientIdHint: 'Found in your PayPal Developer Dashboard',
      clientSecret: 'Client Secret',
      clientSecretPlaceholder: 'Enter your Client Secret',
      clientSecretHint: 'Keep this secret secure',
      featuresTitle: 'PayPal Features',
      feature1: 'Express Checkout',
      feature2: 'Recurring billing',
      feature3: 'Pay Later options',
      feature4: 'Fraud protection',
      securityNotice: 'Security Notice',
      securityNoticeDescription:
        'All credentials are encrypted before storage.',
      cancel: 'Cancel',
      saveConfiguration: 'Save Configuration',
    },
  },
};

const meta: Meta<typeof PayPalModal> = {
  title: 'Molecules/Billing/PayPalModal',
  parameters: { layout: 'centered' },
  component: PayPalModal,
};
export default meta;

type Story = StoryObj<typeof PayPalModal>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <PayPalModal open={true} onOpenChange={() => {}} />
    </NextIntlClientProvider>
  ),
};
