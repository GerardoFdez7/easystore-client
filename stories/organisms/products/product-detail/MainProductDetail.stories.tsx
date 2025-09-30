import type { Meta, StoryObj } from '@storybook/react';
import MainProductDetail from '@organisms/products/product-detail/MainProductDetail';

const meta: Meta<typeof MainProductDetail> = {
  title: 'Organisms/Product Detail/MainProductDetail',
  component: MainProductDetail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
