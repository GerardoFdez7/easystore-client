import type { Meta, StoryObj } from '@storybook/nextjs';
import PagaditoModal from '@molecules/billing/PagaditoModal';
// Storybook provides the app's i18n context; remove local provider/messages

const meta: Meta<typeof PagaditoModal> = {
  title: 'Molecules/Billing/PagaditoModal',
  parameters: { layout: 'centered' },
  component: PagaditoModal,
};
export default meta;

type Story = StoryObj<typeof PagaditoModal>;

export const Default: Story = {
  render: () => (
    <PagaditoModal
      open={true}
      onOpenChange={() => {}}
      onSaved={() => console.log('Pagadito saved from Story')}
    />
  ),
};
