import type { Meta, StoryObj } from '@storybook/nextjs';
import InstallmentsModal from '@molecules/billing/InstallmentsModal';
// Storybook provides the app's i18n context; remove local provider/messages

const meta: Meta<typeof InstallmentsModal> = {
  title: 'Molecules/Billing/InstallmentsModal',
  parameters: { layout: 'centered' },
  component: InstallmentsModal,
};
export default meta;

type Story = StoryObj<typeof InstallmentsModal>;

export const Default: Story = {
  render: () => <InstallmentsModal open={true} onOpenChange={() => {}} />,
};
