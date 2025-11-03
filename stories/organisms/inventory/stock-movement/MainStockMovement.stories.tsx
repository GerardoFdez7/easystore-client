import type { Meta, StoryObj } from '@storybook/nextjs';
import MainStockMovement from '@organisms/inventory/stock-movement/MainStockMovement';
import { MockedProvider } from '@apollo/client/testing/react';
import {
  FindAllMovementsDocument,
  FindWarehousesDocument,
} from '@graphql/generated';
import { mockStockMovements } from '../../../molecules/inventory/mocks/stockMovementMocks';

// Mock warehouse data
const mockWarehouses = [
  {
    id: '1',
    name: 'Main Warehouse',
    city: 'Guatemala City',
    __typename: 'Warehouse' as const,
  },
  {
    id: '2',
    name: 'Secondary Warehouse',
    city: 'Quetzaltenango',
    __typename: 'Warehouse' as const,
  },
  {
    id: '3',
    name: 'Online Store Warehouse',
    city: 'Antigua',
    __typename: 'Warehouse' as const,
  },
];

// Mock GraphQL responses for stock movements
const mockStockMovementsResponse = {
  request: {
    query: FindAllMovementsDocument,
    variables: {
      warehouseId: '1',
      page: 1,
      limit: 25,
      includeDeleted: false,
    },
  },
  result: {
    data: {
      getAllStockMovements: {
        stockMovements: mockStockMovements.map(
          (movement: (typeof mockStockMovements)[0]) => ({
            id: movement.id,
            productName: movement.productName,
            variantSku: movement.variantSku,
            variantFirstAttribute: movement.variantFirstAttribute,
            deltaQty: movement.deltaQuantity,
            reason: movement.reason,
            occurredAt: movement.date,
            __typename: 'StockMovement',
          }),
        ),
        total: mockStockMovements.length,
        hasMore: false,
        __typename: 'PaginatedStockMovementsType',
      },
    },
  },
};

const mockEmptyStockMovementsResponse = {
  request: {
    query: FindAllMovementsDocument,
    variables: {
      warehouseId: '1',
      page: 1,
      limit: 25,
      includeDeleted: false,
    },
  },
  result: {
    data: {
      getAllStockMovements: {
        stockMovements: [],
        total: 0,
        hasMore: false,
        __typename: 'PaginatedStockMovementsType',
      },
    },
  },
};

// Mock GraphQL responses for warehouses
const mockWarehousesResponse = {
  request: {
    query: FindWarehousesDocument,
    variables: {
      page: 1,
      limit: 10,
      name: undefined,
      sortBy: 'NAME',
      sortOrder: 'ASC',
    },
  },
  result: {
    data: {
      getAllWarehouses: {
        warehouses: mockWarehouses,
        total: mockWarehouses.length,
        hasMore: false,
        __typename: 'PaginatedWarehousesType',
      },
    },
  },
};

const meta: Meta<typeof MainStockMovement> = {
  title: 'Organisms/Inventory/History/MainStockMovement',
  component: MainStockMovement,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          'Main organism component for the stock movement history page. Provides a comprehensive interface for viewing and managing stock movements including warehouse selection, filtering, and detailed movement tracking.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MainStockMovement>;

/**
 * Default state of the MainStockMovement component.
 * Shows stock movements for the selected warehouse with pagination and filtering options.
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[mockStockMovementsResponse, mockWarehousesResponse]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Default view showing stock movements in a table format with warehouse selection, pagination controls, and the option to include deleted movements.',
      },
    },
  },
};

/**
 * Empty state - no stock movements exist for the selected warehouse.
 * Shows the empty state message encouraging users to create their first movement.
 */
export const EmptyState: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[mockEmptyStockMovementsResponse, mockWarehousesResponse]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Empty state when no stock movements exist for the selected warehouse. Displays an empty state message with a call-to-action.',
      },
    },
  },
};
