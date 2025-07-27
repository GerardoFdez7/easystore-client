import type { Meta, StoryObj } from '@storybook/react';
import LogoutConfirmDialog from '@atoms/dashboard/LogoutConfirmDialog';
import { Button } from '@shadcn/ui/button';
import { ApolloWrapper } from '@lib/apollo/apollo-provider';

const meta: Meta<typeof LogoutConfirmDialog> = {
  title: 'Atoms/Dashboard/LogoutConfirmDialog',
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
