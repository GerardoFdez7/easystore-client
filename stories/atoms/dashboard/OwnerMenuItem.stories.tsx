import type { Meta, StoryObj } from '@storybook/nextjs';
import OwnerMenuItem from '@atoms/dashboard/OwnerMenuItem';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@shadcn/ui/dropdown-menu';

const meta: Meta<typeof OwnerMenuItem> = {
  title: 'Atoms/Dashboard/OwnerMenuItem',
  component: OwnerMenuItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof OwnerMenuItem>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <OwnerMenuItem icon={User} label="Profile" />
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
