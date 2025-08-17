import type { Meta, StoryObj } from '@storybook/react';
import TypeProduct from '@atoms/product-detail/TypeProduct';

const meta: Meta<typeof TypeProduct> = {
  title: 'Atoms/Product Detail/TypeProduct',
  component: TypeProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
