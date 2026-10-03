import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar, AvatarFallback } from '@shadcn/ui/avatar';

const meta: Meta<typeof Avatar> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByText('ES')).toBeVisible();
  },
  title: 'Shadcn/UI/Avatar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Avatar,
  args: {},
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar className="h-16 w-16">
      <AvatarFallback>ES</AvatarFallback>
    </Avatar>
  ),
};
