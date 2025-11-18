import type { Meta, StoryObj } from '@storybook/nextjs';
import CODModal from '@molecules/billing/CODModal';
// Storybook provides the app's i18n context; remove local provider/messages

const meta: Meta<typeof CODModal> = {
  title: 'Molecules/Billing/CODModal',
  parameters: { layout: 'centered' },
  component: CODModal,
};
export default meta;

type Story = StoryObj<typeof CODModal>;

export const Default: Story = {
  render: () => <CODModal open={true} onOpenChange={() => {}} />,
};
