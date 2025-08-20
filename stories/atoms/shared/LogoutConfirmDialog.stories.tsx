import type { Meta, StoryObj } from '@storybook/nextjs';
import LogoutConfirmDialog from '@atoms/shared/LogoutConfirmDialog';
import { Button } from '@shadcn/ui/button';
import { ApolloWrapper } from '@lib/apollo/apollo-provider';

const meta: Meta<typeof LogoutConfirmDialog> = {
  title: 'Atoms/Shared/LogoutConfirmDialog',
  component: LogoutConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof LogoutConfirmDialog>;

export const Default: Story = {
  render: () => (
    <ApolloWrapper>
      <LogoutConfirmDialog>
        <Button variant={'danger'}>Logout</Button>
      </LogoutConfirmDialog>
    </ApolloWrapper>
  ),
};
