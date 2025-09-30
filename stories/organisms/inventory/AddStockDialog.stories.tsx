import type { Meta, StoryObj } from '@storybook/nextjs';
import { MockedProvider } from '@apollo/client/testing/react';
import AddStockDialog from '@organisms/inventory/AddStockDialog';
import {
  FindAllVariantsToCreateStockDocument,
  FindWarehousesDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';

interface ProductVariant {
  id: string;
  sku: string;
  attributes: { key: string; value: string }[];
}

interface Product {
  name: string;
  variants: ProductVariant[];
}

interface GetAllProductsData {
  getAllProducts: {
    __typename?: 'PaginatedProductsType';
    products: Product[];
    total: number;
    hasMore: boolean;
  };
}

interface Warehouse {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
}

interface GetAllWarehousesData {
  getAllWarehouses: {
    __typename?: 'PaginatedWarehousesType';
    warehouses: Warehouse[];
    total: number;
    hasMore: boolean;
  };
}

const meta: Meta<typeof AddStockDialog> = {
  title: 'Organisms/Inventory/AddStockDialog',
  component: AddStockDialog,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 1200, height: '700px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AddStockDialog>;

// Mock data for variants
const mockVariantsData: GetAllProductsData = {
  getAllProducts: {
    __typename: 'PaginatedProductsType',
    products: [
      {
        name: 'Classic T-Shirt',
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
        name: 'Premium Hoodie',
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
        name: 'Luxury Watch',
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

// Mock data for warehouses
const mockWarehousesData: GetAllWarehousesData = {
  getAllWarehouses: {
    __typename: 'PaginatedWarehousesType',
    warehouses: [
      {
        id: 'wh-1',
        name: 'Main Warehouse',
        location: 'New York, NY',
        isActive: true,
      },
      {
        id: 'wh-2',
        name: 'West Coast Distribution',
        location: 'Los Angeles, CA',
        isActive: true,
      },
      {
        id: 'wh-3',
        name: 'European Hub',
        location: 'London, UK',
        isActive: true,
      },
    ],
    total: 3,
    hasMore: true,
  },
};

// Mock GraphQL requests
const createMocks = (
  variantsData: GetAllProductsData = mockVariantsData,
  warehousesData: GetAllWarehousesData = mockWarehousesData,
  loading = false,
) => [
  {
    request: {
      query: FindAllVariantsToCreateStockDocument,
      variables: {
        page: 1,
        limit: 10,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSoftDeleted: false,
        name: '',
      },
    },
    result: { data: variantsData },
    delay: loading ? Infinity : 2000,
  },
  {
    request: {
      query: FindWarehousesDocument,
      variables: {
        page: 1,
        limit: 50,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSoftDeleted: false,
        name: '',
      },
    },
    result: { data: warehousesData },
  },
];

export const Default: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={createMocks()}>
        <Story />
      </MockedProvider>
    ),
  ],
  args: {
    open: true,
    onOpenChange: () => {},
    onStockAdded: () => {},
  },
};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={createMocks(mockVariantsData, mockWarehousesData, true)}
      >
        <Story />
      </MockedProvider>
    ),
  ],
  args: {
    open: true,
    onOpenChange: () => {},
    onStockAdded: () => {},
  },
};

export const WarehouseStep: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={createMocks()}>
        <Story />
      </MockedProvider>
    ),
  ],
  args: {
    open: true,
    onOpenChange: () => {},
    onStockAdded: () => {},
    step: 'warehouse',
    selectedVariantId: 'var-1',
    selectedProductName: 'Classic T-Shirt',
    selectedVariantAttributes: [
      { key: 'Color', value: 'Red' },
      { key: 'Size', value: 'Medium' },
    ],
  },
};
