import { ProductCard } from '@atoms/products/ProductCard';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof ProductCard> = {
  title: 'Atoms/Products/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isSelected: { control: 'boolean' },
    onSelect: { action: 'selected' },
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
      mediaType: 'IMAGE' as const,
    },
    {
      id: 'media_002',
      url: '/phone.webp',
      position: 2,
      mediaType: 'IMAGE' as const,
    },
  ],
  isArchived: false,
  productType: 'Standard',
  shortDescription: 'A reusable eco-friendly water bottle.',
};

export const Default: Story = {
  args: {
    product: mockProduct,
    isSelected: false,
    onSelect: (checked: boolean) => console.log('Selected:', checked),
  },
};

export const Selected: Story = {
  args: {
    product: mockProduct,
    isSelected: true,
    onSelect: (checked: boolean) => console.log('Selected:', checked),
  },
};

export const WithoutMedia: Story = {
  args: {
    product: {
      ...mockProduct,
      media: undefined,
      isArchived: false,
      productType: 'Standard',
      shortDescription: 'A reusable eco-friendly water bottle.',
    },
    isSelected: false,
    onSelect: (checked: boolean) => console.log('Selected:', checked),
  },
};
