import type { Meta, StoryObj } from '@storybook/nextjs';
import CashPaymentModal from '@molecules/billing/CashPaymentModal';
// Storybook provides the app's i18n context; remove local provider/messages

const meta: Meta<typeof CashPaymentModal> = {
  title: 'Molecules/Billing/CashPaymentModal',
  parameters: { layout: 'centered' },
  component: CashPaymentModal,
};
export default meta;

type Story = StoryObj<typeof CashPaymentModal>;

export const Default: Story = {
  render: () => <CashPaymentModal open={true} onOpenChange={() => {}} />,
};
