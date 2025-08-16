import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from '@shadcn/ui/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Shadcn/Avatar',
  component: Avatar,
  args: {},
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar className="h-16 w-16">
      <AvatarImage src="https://i.pravatar.cc/100?img=12" alt="@user" />
      <AvatarFallback>ES</AvatarFallback>
    </Avatar>
  ),
};
