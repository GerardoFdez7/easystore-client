import type { Meta, StoryObj } from '@storybook/react';
import DeleteProduct from '@atoms/products/product-detail/DeleteProduct';

const meta: Meta<typeof DeleteProduct> = {
  title: 'Atoms/Product Detail/DeleteProduct',
  component: DeleteProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
