import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LogoutConfirmDialog from '@atoms/shared/LogoutConfirmDialog';
import { Button } from '@shadcn/ui/button';
import { ApolloWrapper } from '@lib/apollo/apollo-provider';

const meta: Meta<typeof LogoutConfirmDialog> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Logout' }),
    ).toBeInTheDocument();
  },
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
