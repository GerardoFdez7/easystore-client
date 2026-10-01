import ImageTopProducts from '@atoms/dashboard/ImageTopProducts';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof ImageTopProducts> = {
  title: 'Atoms/Dashboard/ImageTopProducts',
  component: ImageTopProducts,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImageTopProducts>;

export const Default: Story = {};
