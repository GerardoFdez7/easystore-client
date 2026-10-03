import { expect as storybookExpect, within } from 'storybook/test';
import ImageTopProducts from '@atoms/dashboard/ImageTopProducts';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ImageTopProducts> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('img')).toBeInTheDocument();
  },
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
