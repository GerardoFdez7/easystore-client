import { ProductGrid } from '@molecules/products/ProductGrid';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof ProductGrid> = {
  title: 'Molecules/Products/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    products: { control: 'object' },
    selectedProducts: { control: 'object' },
    onSelectProduct: { action: 'productSelected' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductGrid>;

const mockProducts = [
  {
    id: '1',
    name: 'Phone',
    status: 'Active',
    inventory: 150,
    category: 'Electronics',
    cover: '/phone.webp',
    media: [
      {
        id: 'media_001',
        url: '/default.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
    ],
  },
  {
    id: '2',
    name: 'Eco-Friendly Water Bottle',
    status: 'Active',
    inventory: 75,
    category: 'Home & Kitchen',
    cover: '/default.webp',
    media: [
      {
        id: 'media_002',
        url: '/phone.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
    ],
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    status: 'Archived',
    inventory: 25,
    category: 'Electronics',
    cover: '/phone.webp',
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
    selectedProducts: [],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
  },
};

export const WithSelection: Story = {
  args: {
    products: mockProducts,
    selectedProducts: ['1', '3'],
    onSelectProduct: (productId: string, checked: boolean) =>
      console.log('Product selected:', productId, checked),
  },
};
