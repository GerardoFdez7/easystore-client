import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProductGrid } from '@molecules/products/ProductGrid';
import { TypeEnum, MediaTypeEnum, ConditionEnum } from '@graphql/generated';

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
    name: 'Phone',
    brand: 'TechCorp',
    cover: '/default.webp',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    isArchived: false,
    longDescription: 'A modern smartphone with advanced features.',
    manufacturer: 'TechCorp Manufacturing',
    productType: TypeEnum.Physical,
    shortDescription: 'A modern smartphone.',
    tags: ['electronics', 'mobile', 'smartphone'],
    categories: [
      {
        categoryId: '1',
        categoryName: 'Electronics',
      },
    ],
    media: [
      {
        id: 'media_001',
        url: '/default.webp',
        position: 1,
        mediaType: MediaTypeEnum.Image,
      },
    ],
    variants: [
      {
        id: 'variant_1',
        price: 699.99,
        sku: 'PHN-001',
        condition: ConditionEnum.New,
        attributes: [
          {
            key: 'Color',
            value: 'Black',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Eco-Friendly Water Bottle',
    brand: 'EcoLife',
    cover: '/default.webp',
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
    isArchived: false,
    longDescription: 'A sustainable water bottle made from recycled materials.',
    manufacturer: 'EcoLife Products',
    productType: TypeEnum.Physical,
    shortDescription: 'Reusable water bottle.',
    tags: ['eco-friendly', 'sustainable', 'bottle'],
    categories: [
      {
        categoryId: '2',
        categoryName: 'Home & Kitchen',
      },
    ],
    media: [
      {
        id: 'media_002',
        url: '/default.webp',
        position: 1,
        mediaType: MediaTypeEnum.Image,
      },
    ],
    variants: [
      {
        id: 'variant_2',
        price: 24.99,
        sku: 'WTR-002',
        condition: ConditionEnum.New,
        attributes: [
          {
            key: 'Size',
            value: '500ml',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    cover: '/default.webp',
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-25T09:30:00Z',
    isArchived: true,
    longDescription: 'Premium noise-cancelling wireless headphones.',
    manufacturer: 'AudioTech Industries',
    productType: TypeEnum.Physical,
    shortDescription: 'Noise-cancelling headphones.',
    tags: ['audio', 'wireless', 'headphones'],
    categories: [
      {
        categoryId: '1',
        categoryName: 'Electronics',
      },
    ],
    variants: [
      {
        id: 'variant_3',
        price: 199.99,
        sku: 'HDN-003',
        condition: ConditionEnum.Used,
        attributes: [
          {
            key: 'Color',
            value: 'White',
          },
        ],
      },
    ],
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

export const Loading: Story = {
  args: {
    products: [],
    loading: true,
    limit: 8,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loading state displaying ProductCardSkeleton components while products are being fetched.',
      },
    },
  },
};

export const LoadingMore: Story = {
  args: {
    products: [],
    loading: false,
    isLoadingMore: true,
    limit: 4,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loading more state showing existing products with additional skeleton cards for pagination loading.',
      },
    },
  },
};
