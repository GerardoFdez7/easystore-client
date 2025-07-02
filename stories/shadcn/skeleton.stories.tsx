import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@shadcn/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Shadcn/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'w-40 h-8 bg-primary',
  },
};

export const Circle: Story = {
  args: {
    className: 'w-16 h-16 rounded-full bg-primary',
  },
};
