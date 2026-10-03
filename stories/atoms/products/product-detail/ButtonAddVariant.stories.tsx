import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonAddVariant from '@atoms/products/product-detail/ButtonAddVariant';

const meta: Meta<typeof ButtonAddVariant> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Add Variant' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Products/Product Detail/ButtonAddVariant',
  component: ButtonAddVariant,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productId: 'product-123',
  },
};
