import type { Meta, StoryObj } from '@storybook/nextjs';
import { MockedProvider } from '@apollo/client/testing/react';
import { GraphQLError } from 'graphql';
import MainInventory from '@organisms/inventory/MainInventory';
import { FindInventoryDocument } from '@graphql/generated';
import { mockInventoryTableData } from '@lib/utils';

const meta: Meta<typeof MainInventory> = {
  title: 'Organisms/Inventory/MainInventory',
  component: MainInventory,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MainInventory>;

// Default state with inventory data
export const Default: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: FindInventoryDocument,
              variables: {},
            },
            result: {
              data: {
                getAllWarehouses: {
                  __typename: 'PaginatedWarehousesType',
                  total: mockInventoryTableData.length,
                  hasMore: false,
                  warehouses: [
                    {
                      __typename: 'WarehouseType',
                      id: 'mock-warehouse-id',
                      name: 'Mock Warehouse',
                      stockPerWarehouses: mockInventoryTableData.map(
                        (item) => ({
                          ...item,
                          __typename: 'StockPerWarehouseType',
                        }),
                      ),
                    },
                  ],
                },
              },
            },
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
};

// Loading state - keeps the query in loading state indefinitely
export const Loading: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: FindInventoryDocument,
              variables: {},
            },
            delay: Infinity, // This will keep the query in loading state
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
};

// Error state - simulates a GraphQL error
export const EmptyInventory: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: FindInventoryDocument,
              variables: {},
            },
            error: new GraphQLError('Failed to fetch inventory data'),
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
};

// Empty state - returns empty warehouses array
export const EmptyWarehouse: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: FindInventoryDocument,
              variables: {},
            },
            result: {
              data: {
                getAllWarehouses: {
                  __typename: 'PaginatedWarehousesType',
                  total: 0,
                  hasMore: false,
                  warehouses: [],
                },
              },
            },
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
};
