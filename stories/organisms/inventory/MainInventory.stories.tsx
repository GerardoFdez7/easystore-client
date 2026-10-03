import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import { GraphQLError } from 'graphql';
import MainInventory from '@organisms/inventory/MainInventory';
import { FindInventoryDocument } from '@graphql/generated';
import { mockInventoryTableData } from '../../molecules/inventory/mocks/inventory-table';

const meta: Meta<typeof MainInventory> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('textbox', { name: /search/i }),
    ).toBeInTheDocument();
  },
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
      <ApolloMswMocks
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
      </ApolloMswMocks>
    ),
  ],
};

// Loading state - keeps the query in loading state indefinitely
export const Loading: Story = {
  decorators: [
    (Story) => (
      <ApolloMswMocks
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
      </ApolloMswMocks>
    ),
  ],
};

// Error state - simulates a GraphQL error
export const EmptyInventory: Story = {
  decorators: [
    (Story) => (
      <ApolloMswMocks
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
      </ApolloMswMocks>
    ),
  ],
};

// Empty state - returns empty warehouses array
export const EmptyWarehouse: Story = {
  decorators: [
    (Story) => (
      <ApolloMswMocks
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
      </ApolloMswMocks>
    ),
  ],
};
