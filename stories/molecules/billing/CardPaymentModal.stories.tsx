import type { Meta, StoryObj } from '@storybook/nextjs';
import CardPaymentModal from '@molecules/billing/CardPaymentModal';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    CardPayment: {
      title: 'Card Payments',
      description: 'Configure card payment providers',
      provider: 'Provider',
      providerHint: 'Select the card provider',
      merchantId: 'Merchant ID',
      merchantIdPlaceholder: 'Enter merchant id',
      apiKey: 'API Key',
      apiKeyPlaceholder: 'Enter API key',
      secretKey: 'Secret Key',
      secretKeyPlaceholder: 'Enter secret key',
      captureMode: 'Capture',
      captureModeDescription: 'Automatically capture payments',
      captureModeEnabled: 'Capture enabled',
      captureModeDisabled: 'Capture disabled',
      uid: 'UID',
      uidPlaceholder: 'Enter UID',
      uidHint: 'Unique identifier',
      wsk: 'WSK',
      wskPlaceholder: 'Enter WSK',
      wskHint: 'Web service key',
      pagaditoFeatures: 'Pagadito features',
      pagaditoFeature1: 'Feature one',
      pagaditoFeature2: 'Feature two',
      pagaditoFeature3: 'Feature three',
      pagaditoFeature4: 'Feature four',
      cancel: 'Cancel',
      saveConfiguration: 'Save Configuration',
    },
  },
};

const meta: Meta<typeof CardPaymentModal> = {
  title: 'Molecules/Billing/CardPaymentModal',
  parameters: { layout: 'centered' },
  component: CardPaymentModal,
};
export default meta;

type Story = StoryObj<typeof CardPaymentModal>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <CardPaymentModal open={true} onOpenChange={() => {}} />
    </NextIntlClientProvider>
  ),
};
