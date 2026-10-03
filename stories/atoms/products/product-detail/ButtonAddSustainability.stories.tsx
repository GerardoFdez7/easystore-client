import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonAddSustainability from '@atoms/products/product-detail/ButtonAddSustainability';

const meta: Meta<typeof ButtonAddSustainability> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Add Sustainability' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Products/Product Detail/ButtonAddSustainability',
  component: ButtonAddSustainability,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
