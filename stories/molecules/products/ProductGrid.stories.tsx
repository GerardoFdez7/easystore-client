import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProductGrid } from '@molecules/products/ProductGrid';

const meta: Meta<typeof ProductGrid> = {
  title: 'Molecules/Products/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    products: {
      description: 'Array of products to display in the grid',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    manufacturer: 'AudioTech Inc.',
    cover: '/default.webp',
    media: [
      {
        id: 'media_001',
        url: '/default.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
    ],
    categories: [{ categoryId: 'electronics', categoryName: 'Electronics' }],
    tags: ['wireless', 'audio', 'bluetooth'],
    variants: [
      {
        id: 'variant_001',
        sku: 'WH-001',
        price: 199.99,
        attributes: [{ key: 'Color', value: 'Black' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: 'Physical',
    shortDescription: 'Premium wireless headphones with noise cancellation',
  },
  {
    id: '2',
    name: 'Smart Watch',
    brand: 'TechGear',
    manufacturer: 'TechGear Ltd.',
    cover: '/default.webp',
    media: [
      {
        id: 'media_002',
        url: '/default.webp',
        position: 1,
        mediaType: 'IMAGE' as const,
      },
    ],
    categories: [{ categoryId: 'wearables', categoryName: 'Wearables' }],
    tags: ['smartwatch', 'fitness', 'bluetooth'],
    variants: [
      {
        id: 'variant_002',
        sku: 'SW-001',
        price: 299.99,
        attributes: [{ key: 'Color', value: 'Silver' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: 'Physical',
    shortDescription: 'Fitness tracker with heart rate monitor',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    brand: 'ErgoDesk',
    manufacturer: 'ErgoDesk Co.',
    cover: '/default.webp',
    media: [],
    categories: [{ categoryId: 'accessories', categoryName: 'Accessories' }],
    tags: ['ergonomic', 'desk', 'aluminum'],
    variants: [
      {
        id: 'variant_003',
        sku: 'LS-001',
        price: 49.99,
        attributes: [{ key: 'Material', value: 'Aluminum' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: 'Physical',
    shortDescription: 'Adjustable aluminum laptop stand',
  },
  {
    id: '4',
    name: 'USB-C Hub',
    brand: 'ConnectPro',
    manufacturer: 'ConnectPro Inc.',
    cover: '/default.webp',
    media: [],
    categories: [{ categoryId: 'accessories', categoryName: 'Accessories' }],
    tags: ['usb-c', 'hub', 'multiport'],
    variants: [
      {
        id: 'variant_004',
        sku: 'UH-001',
        price: 79.99,
        attributes: [{ key: 'Ports', value: '7-in-1' }],
      },
    ],
    status: 'Active',
    isArchived: false,
    productType: 'Physical',
    shortDescription: '7-in-1 USB-C hub with multiple ports',
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
  },
};

export const WithManyProducts: Story = {
  args: {
    products: [
      ...mockProducts,
      ...mockProducts.map((p, i) => ({
        ...p,
        id: `${p.id}-${i}`,
        name: `${p.name} ${i + 1}`,
      })),
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Grid with multiple products demonstrating responsive layout across different screen sizes.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    products: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Empty state displayed when no products are available. Shows a helpful message to the user.',
      },
    },
  },
};

export const SingleProduct: Story = {
  args: {
    products: [mockProducts[0]],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Grid with a single product, demonstrating the minimum viable display.',
      },
    },
  },
};
