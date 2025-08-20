import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from '@shadcn/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'Shadcn/Badge',
  parameters: {
    layout: 'centered',
  },
  component: Badge,
  args: { children: 'New' },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Beta' },
};
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Error' },
};
export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};
