import type { Meta, StoryObj } from '@storybook/nextjs';
import MainBilling from '@organisms/billing/MainBilling';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  Billing: {
    subtitle: 'Payment methods',
    gridAria: 'Billing methods grid',
    methods: {
      cards: { title: 'Cards', description: 'Accept credit and debit cards' },
      cash: { title: 'Cash', description: 'Cash payments' },
      bank_transfer: { title: 'Bank transfer', description: 'Bank transfers' },
      paypal: { title: 'PayPal', description: 'PayPal payments' },
      cod: { title: 'COD', description: 'Cash on delivery' },
      installments: { title: 'Installments', description: 'Split payments' },
    },
  },
};

const meta: Meta<typeof MainBilling> = {
  title: 'Organisms/Billing/MainBilling',
  parameters: { layout: 'fullscreen' },
  component: MainBilling,
};
export default meta;

type Story = StoryObj<typeof MainBilling>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <MainBilling />
    </NextIntlClientProvider>
  ),
};
