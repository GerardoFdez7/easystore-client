import ProductStatus from '@atoms/products/ProductStatus';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { TypeEnum, type Product } from '@graphql/generated';

const activeProduct = {
  id: 'product-1',
  name: 'Reusable bottle',
  cover: '/default.webp',
  createdAt: '2026-01-10T12:00:00.000Z',
  updatedAt: '2026-01-11T12:00:00.000Z',
  isArchived: false,
  productType: TypeEnum.Physical,
  shortDescription: 'A durable everyday bottle.',
} satisfies Product;

const meta: Meta<typeof ProductStatus> = {
  title: 'Atoms/Products/ProductStatus',
  component: ProductStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    product: {
      control: 'object',
      description: 'Product whose archive status is displayed.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductStatus>;

export const Active: Story = {
  args: {
    product: activeProduct,
  },
};

export const Archived: Story = {
  args: {
    product: {
      ...activeProduct,
      isArchived: true,
    },
  },
};
