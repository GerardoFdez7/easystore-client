import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@shadcn/ui/badge';

const meta: Meta<typeof Badge> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByText(/New|Beta|Error|Outline/),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Badge',
  tags: ['autodocs'],
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
