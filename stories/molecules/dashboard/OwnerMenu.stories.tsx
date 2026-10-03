import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import OwnerMenu from '@molecules/dashboard/OwnerMenu';
import { ApolloWrapper } from '@lib/apollo/apollo-provider';

const meta: Meta<typeof OwnerMenu> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByLabelText('Account menu'),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Dashboard/OwnerMenu',
  component: OwnerMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof OwnerMenu>;

export const Default: Story = {
  render: () => (
    <ApolloWrapper>
      <OwnerMenu />
    </ApolloWrapper>
  ),
};
