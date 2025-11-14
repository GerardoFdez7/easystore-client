import type { Meta, StoryObj } from '@storybook/nextjs';
import PagaditoModal from '@molecules/billing/PagaditoModal';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    Pagadito: {
      title: 'Pagadito',
      description: 'Configure Pagadito credentials',
      uid: 'UID',
      uidPlaceholder: 'Enter UID',
      uidHint: 'Your Pagadito UID',
      wsk: 'WSK',
      wskPlaceholder: 'Enter WSK',
      wskHint: 'Web Service Key',
      featuresTitle: 'Pagadito features',
      feature1: 'Feature 1',
      feature2: 'Feature 2',
      feature3: 'Feature 3',
      feature4: 'Feature 4',
      securityNotice: 'Security Notice',
      securityNoticeDescription:
        'All credentials are encrypted and stored securely.',
      cancel: 'Cancel',
      saveConfiguration: 'Save Configuration',
    },
  },
};

const meta: Meta<typeof PagaditoModal> = {
  title: 'Molecules/Billing/PagaditoModal',
  parameters: { layout: 'centered' },
  component: PagaditoModal,
};
export default meta;

type Story = StoryObj<typeof PagaditoModal>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <PagaditoModal
        open={true}
        onOpenChange={() => {}}
        onSaved={() => console.log('Pagadito saved from Story')}
      />
    </NextIntlClientProvider>
  ),
};
