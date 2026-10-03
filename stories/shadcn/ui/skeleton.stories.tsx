import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from '@shadcn/ui/skeleton';

const meta: Meta<typeof Skeleton> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('status', { name: 'Loading placeholder' }),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Skeleton',
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
    role: 'status',
    'aria-label': 'Loading placeholder',
    className: 'w-40 h-8 bg-primary',
  },
};

export const Circle: Story = {
  args: {
    role: 'status',
    'aria-label': 'Loading placeholder',
    className: 'w-16 h-16 rounded-full bg-primary',
  },
};
