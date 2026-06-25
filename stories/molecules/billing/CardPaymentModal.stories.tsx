import type { Meta, StoryObj } from '@storybook/nextjs';
import CardPaymentModal from '@molecules/billing/CardPaymentModal';
// Storybook already provides the app's Intl context; no local messages are necessary.

const meta: Meta<typeof CardPaymentModal> = {
  title: 'Molecules/Billing/CardPaymentModal',
  parameters: { layout: 'centered' },
  component: CardPaymentModal,
};
export default meta;

type Story = StoryObj<typeof CardPaymentModal>;

export const Default: Story = {
  render: () => <CardPaymentModal open={true} onOpenChange={() => {}} />,
};
