import type { Meta, StoryObj } from '@storybook/nextjs';
import { MockedProvider } from '@apollo/client/testing/react';
import VariantSelector from '@organisms/inventory/VariantSelector';
import {
  FindAllVariantsToCreateStockDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';

const meta: Meta<typeof VariantSelector> = {
  title: 'Organisms/Inventory/VariantSelector',
  component: VariantSelector,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 1000, height: '600px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof VariantSelector>;

// Mock data for variants
const mockVariantsData = {
  getAllProducts: {
    products: [
      {
        name: 'Classic T-Shirt', // Remove id field to match GraphQL schema
        variants: [
          {
            id: 'var-1',
            sku: 'TSHIRT-RED-M',
            attributes: [
              { key: 'Color', value: 'Red' },
              { key: 'Size', value: 'Medium' },
            ],
          },
          {
            id: 'var-2',
            sku: 'TSHIRT-RED-L',
            attributes: [
              { key: 'Color', value: 'Red' },
              { key: 'Size', value: 'Large' },
            ],
          },
          {
            id: 'var-3',
            sku: 'TSHIRT-BLUE-M',
            attributes: [
              { key: 'Color', value: 'Blue' },
              { key: 'Size', value: 'Medium' },
            ],
          },
        ],
      },
      {
        name: 'Premium Hoodie', // Remove id field to match GraphQL schema
        variants: [
          {
            id: 'var-4',
            sku: 'HOODIE-BLACK-S',
            attributes: [
              { key: 'Color', value: 'Black' },
              { key: 'Size', value: 'Small' },
              { key: 'Material', value: 'Cotton' },
            ],
          },
          {
            id: 'var-5',
            sku: 'HOODIE-GRAY-M',
            attributes: [
              { key: 'Color', value: 'Gray' },
              { key: 'Size', value: 'Medium' },
              { key: 'Material', value: 'Cotton' },
            ],
          },
        ],
      },
      {
        name: 'Luxury Watch', // Remove id field to match GraphQL schema
        variants: [
          {
            id: 'var-6',
            sku: 'WATCH-GOLD-42MM',
            attributes: [
              { key: 'Color', value: 'Gold' },
              { key: 'Size', value: '42mm' },
              { key: 'Material', value: 'Stainless Steel' },
              { key: 'Band', value: 'Leather' },
              { key: 'Movement', value: 'Automatic' },
              { key: 'Water Resistance', value: '100m' },
              { key: 'Crystal', value: 'Sapphire' },
              { key: 'Case Shape', value: 'Round' },
              { key: 'Dial Color', value: 'White' },
              { key: 'Clasp Type', value: 'Buckle' },
            ],
          },
        ],
      },
    ],
    total: 3,
    hasMore: true,
  },
};

const mockVariantsEmpty = {
  getAllProducts: {
    products: [],
    total: 0,
    hasMore: false, // Add hasMore field required by GraphQL schema
  },
};

interface ProductAttribute {
  key: string;
  value: string;
}

interface ProductVariant {
  id: string;
  sku: string;
  attributes: ProductAttribute[];
}

interface Product {
  name: string; // Remove id field to match GraphQL schema
  variants: ProductVariant[];
}

interface GetAllProductsData {
  getAllProducts: {
    products: Product[];
    total: number;
    hasMore: boolean; // Add hasMore field required by GraphQL schema
  };
}

// Mock GraphQL requests
const createMocks = (
  data: GetAllProductsData | null,
  loading = false,
  error = false,
) => [
  {
    request: {
      query: FindAllVariantsToCreateStockDocument,
      variables: {
        page: 1,
        limit: 10, // Match component's limit
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSoftDeleted: false,
        name: '',
      },
    },
    result: error
      ? { errors: [{ message: 'Failed to load variants' }] }
      : { data },
    delay: loading ? Infinity : 0,
  },
];

export const Default: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={createMocks(mockVariantsData)}>
        <Story />
      </MockedProvider>
    ),
  ],
  args: {
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
  },
};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={createMocks(mockVariantsData, true)}>
        <Story />
      </MockedProvider>
    ),
  ],
  args: {
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
  },
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={createMocks(mockVariantsEmpty)}>
        <Story />
      </MockedProvider>
    ),
  ],
  args: {
    onVariantSelect: (variantId, productName) =>
      console.log('Selected variant:', variantId, 'from product:', productName),
  },
};
