import MenuOwnerName from '@atoms/dashboard/MenuOwnerName';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MenuOwnerName> = {
  title: 'Atoms/Dashboard/MenuOwnerName',
  component: MenuOwnerName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MenuOwnerName>;

export const Default: Story = {};
