import { ProductCard } from '@atoms/products/ProductCard';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { MediaTypeEnum, TypeEnum } from '@graphql/generated';

const meta: Meta<typeof ProductCard> = {
  title: 'Atoms/Products/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    product: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductCard>;

const mockProduct = {
  id: '1',
  name: 'Eco-Friendly Water Bottle',
  status: 'Active',
  inventory: 150,
  category: 'Home & Kitchen',
  cover: '/phone.webp',
  media: [
    {
      id: 'media_001',
      url: '/default.webp',
      position: 1,
      mediaType: MediaTypeEnum.Image,
    },
    {
      id: 'media_002',
      url: '/phone.webp',
      position: 2,
      mediaType: MediaTypeEnum.Image,
    },
  ],
  isArchived: false,
  productType: TypeEnum.Physical,
  shortDescription: 'A reusable eco-friendly water bottle.',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T12:30:00Z',
};

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const Selected: Story = {
  args: {
    product: mockProduct,
  },
};

export const WithoutMedia: Story = {
  args: {
    product: {
      ...mockProduct,
      media: undefined,
      isArchived: false,
      productType: TypeEnum.Physical,
      shortDescription: 'A reusable eco-friendly water bottle.',
    },
  },
};
