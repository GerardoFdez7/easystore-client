import type { Meta, StoryObj } from '@storybook/nextjs';
import BankTransferModal from '@molecules/billing/BankTransferModal';
// Storybook provides the app's i18n context; remove local provider/messages

const meta: Meta<typeof BankTransferModal> = {
  title: 'Molecules/Billing/BankTransferModal',
  parameters: { layout: 'centered' },
  component: BankTransferModal,
};
export default meta;

type Story = StoryObj<typeof BankTransferModal>;

export const Default: Story = {
  render: () => <BankTransferModal open={true} onOpenChange={() => {}} />,
};
