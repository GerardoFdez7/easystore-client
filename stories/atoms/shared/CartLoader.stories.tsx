import type { Meta, StoryObj } from '@storybook/react';
import CartLoader from '@atoms/shared/CartLoader';

const meta = {
  title: 'Atoms/Shared/CartLoader',
  component: CartLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the loader container',
    },
    size: {
      control: 'number',
      description:
        'Size of the loader (width and height in Tailwind CSS units)',
      defaultValue: 1,
    },
  },
} satisfies Meta<typeof CartLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 1,
  },
};

export const Small: Story = {
  args: {
    size: 10,
  },
};

export const CustomClass: Story = {
  args: {
    className: 'bg-blue-200 rounded-lg',
    size: 60,
  },
};
