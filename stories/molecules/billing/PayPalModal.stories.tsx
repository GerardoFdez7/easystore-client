import type { Meta, StoryObj } from '@storybook/nextjs';
import PayPalModal from '@molecules/billing/PayPalModal';
// Storybook provides the app's i18n context; remove local provider/messages

const meta: Meta<typeof PayPalModal> = {
  title: 'Molecules/Billing/PayPalModal',
  parameters: { layout: 'centered' },
  component: PayPalModal,
};
export default meta;

type Story = StoryObj<typeof PayPalModal>;

export const Default: Story = {
  render: () => <PayPalModal open={true} onOpenChange={() => {}} />,
};
