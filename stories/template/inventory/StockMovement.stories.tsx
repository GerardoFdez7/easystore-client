import type { Meta, StoryObj } from '@storybook/nextjs';
import StockMovementTemplate from '@templates/inventory/StockMovement';
import { MockedProvider } from '@apollo/client/testing/react';
import {
  FindAllMovementsDocument,
  FindWarehousesDocument,
} from '@graphql/generated';
import { mockStockMovements } from '../../molecules/inventory/mocks/stockMovementMocks';

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

const meta: Meta<typeof StockMovementTemplate> = {
  title: 'Templates/Inventory/History/StockMovement',
  component: StockMovementTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          'Complete stock movement history template page. Includes header navigation, sidebar layout, and the main stock movement interface for viewing and managing stock movements across warehouses.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof StockMovementTemplate>;

/**
 * Default state of the StockMovement template.
 * Shows the complete stock movement history page with data.
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
          'Complete stock movement history page showing movements in a table format with warehouse selection, pagination, and filtering options.',
      },
    },
  },
};

/**
 * Empty state - no stock movements exist.
 * Shows the template when no movement data is available.
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
          'Empty state of the stock movement history page when no movements exist for the selected warehouse.',
      },
    },
  },
};
