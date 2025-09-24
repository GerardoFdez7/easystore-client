import type { Meta, StoryObj } from '@storybook/nextjs';
import { SortBy, SortOrder } from '@graphql/generated';
import WarehouseList from '@organisms/inventory/WarehouseList';
import { mockWarehouses } from './mocks/mockWarehouses';

const meta: Meta<typeof WarehouseList> = {
  title: 'Organisms/Inventory/WarehouseList',
  component: WarehouseList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The WarehouseList component displays a list of warehouses with search, sorting, and pagination functionality.
It provides a comprehensive interface for managing warehouse data with loading states and empty state handling.

## Features
- Search functionality with real-time filtering
- Sorting controls (by name, created date, updated date)
- Pagination with load more functionality
- Loading skeleton states
- Empty state with call-to-action
- Responsive design
- Configurable UI elements (search, sort controls, create button)

## Usage
This component is typically used within warehouse management dialogs or pages where users need to
view and interact with warehouse data.
        `,
      },
    },
  },
  argTypes: {
    warehouses: {
      description: 'Array of warehouse objects to display',
      control: { type: 'object' },
    },
    loading: {
      description: 'Loading state for the warehouse list',
      control: { type: 'boolean' },
    },
    hasMore: {
      description: 'Whether there are more warehouses to load',
      control: { type: 'boolean' },
    },
    searchTerm: {
      description: 'Current search term for filtering warehouses',
      control: { type: 'text' },
    },
    sortBy: {
      description: 'Current sort field',
      control: { type: 'select' },
      options: Object.values(SortBy),
    },
    sortOrder: {
      description: 'Current sort order (ascending or descending)',
      control: { type: 'select' },
      options: Object.values(SortOrder),
    },
    showCreateButton: {
      description: 'Whether to show the create warehouse button',
      control: { type: 'boolean' },
    },
    showSearch: {
      description: 'Whether to show the search bar',
      control: { type: 'boolean' },
    },
    showSortControls: {
      description: 'Whether to show the sort controls',
      control: { type: 'boolean' },
    },
    className: {
      description: 'Additional CSS classes for the container',
      control: { type: 'text' },
    },
    onSearchChange: {
      description: 'Callback fired when search term changes',
      action: 'search-changed',
    },
    onSortByChange: {
      description: 'Callback fired when sort field changes',
      action: 'sort-by-changed',
    },
    onSortOrderChange: {
      description: 'Callback fired when sort order changes',
      action: 'sort-order-changed',
    },
    onLoadMore: {
      description: 'Callback fired when load more button is clicked',
      action: 'load-more',
    },
    onCreateWarehouse: {
      description: 'Callback fired when create warehouse button is clicked',
      action: 'create-warehouse',
    },
    onEditWarehouse: {
      description: 'Callback fired when edit warehouse action is triggered',
      action: 'edit-warehouse',
    },
  },
};

export default meta;

type Story = StoryObj<typeof WarehouseList>;

// Default story with full warehouse list
export const Default: Story = {
  args: {
    warehouses: mockWarehouses.warehouses,
    loading: false,
    hasMore: true,
    searchTerm: '',
    sortBy: SortBy.Name,
    sortOrder: SortOrder.Asc,
    showCreateButton: true,
    showSearch: true,
    showSortControls: true,
    onSearchChange: () => {},
    onSortByChange: () => {},
    onSortOrderChange: () => {},
    onLoadMore: () => {},
    onCreateWarehouse: () => {},
    onEditWarehouse: () => {},
  },
};

// Loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    warehouses: [],
    loading: true,
    hasMore: false,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    ...Default.args,
    warehouses: [],
    loading: false,
    hasMore: false,
  },
};

// With search term
export const WithSearchTerm: Story = {
  args: {
    ...Default.args,
    searchTerm: 'Distribution',
    warehouses: mockWarehouses.warehouses.filter((warehouse) =>
      warehouse.name.toLowerCase().includes('distribution'),
    ),
  },
};

// Sorted by created date descending
export const SortedByCreatedDate: Story = {
  args: {
    ...Default.args,
    sortBy: SortBy.CreatedAt,
    sortOrder: SortOrder.Desc,
    warehouses: [...mockWarehouses.warehouses].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ),
  },
};

// Limited warehouses without load more
export const LimitedResults: Story = {
  args: {
    ...Default.args,
    warehouses: mockWarehouses.warehouses.slice(0, 3),
    hasMore: false,
  },
};

// Minimal UI (no search, no sort controls, no create button)
export const MinimalUI: Story = {
  args: {
    ...Default.args,
    showCreateButton: false,
    showSearch: false,
    showSortControls: false,
  },
};

// Single warehouse
export const SingleWarehouse: Story = {
  args: {
    ...Default.args,
    warehouses: [mockWarehouses.warehouses[0]],
    hasMore: false,
  },
};

// With custom className
export const WithCustomStyling: Story = {
  args: {
    ...Default.args,
    className: 'bg-gray-50 p-4 rounded-lg border',
    warehouses: mockWarehouses.warehouses.slice(0, 4),
  },
};
