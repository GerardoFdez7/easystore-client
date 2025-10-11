import type { Meta, StoryObj } from '@storybook/react';
import ArchivedProduct from '@atoms/products/product-detail/ArchivedProduct';

const meta: Meta<typeof ArchivedProduct> = {
  title: 'Atoms/Product Detail/ArchivedProduct',
  component: ArchivedProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
