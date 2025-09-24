import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';
import { MockedProvider } from '@apollo/client/testing/react';
import { FindWarehousesDocument } from '@graphql/generated';

// Mock data for successful query
const mockWarehouses = {
  getAllWarehouses: {
    warehouses: [
      {
        id: '1',
        name: 'Main Warehouse',
        city: 'New York',
        addressLine1: '123 Main St',
        countryCode: 'US',
        postalCode: '10001',
      },
      {
        id: '2',
        name: 'West Coast Storage',
        city: 'Los Angeles',
        addressLine1: '456 West Blvd',
        countryCode: 'US',
        postalCode: '90001',
      },
      {
        id: '3',
        name: 'Central Distribution',
        city: 'Chicago',
        addressLine1: '789 Central Ave',
        countryCode: 'US',
        postalCode: '60601',
      },
      {
        id: '4',
        name: 'Southern Hub',
        city: 'Houston',
        addressLine1: '321 South St',
        countryCode: 'US',
        postalCode: '77001',
      },
      {
        id: '5',
        name: 'Regional Storage',
        city: 'Miami',
        addressLine1: '654 Beach Dr',
        countryCode: 'US',
        postalCode: '33101',
      },
    ],
    total: 5,
    hasMore: false,
  },
};

const emptyMock = {
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
        warehouses: [],
        total: 0,
        hasMore: false,
      },
    },
  },
};

// Mock for successful query
const successMock = {
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
    data: mockWarehouses,
  },
};

const mockWarehousesHasMore = {
  getAllWarehouses: {
    warehouses: [
      {
        id: '1',
        name: 'Main Warehouse',
        city: 'New York',
        addressLine1: '123 Main St',
        countryCode: 'US',
        postalCode: '10001',
      },
      {
        id: '2',
        name: 'West Coast Storage',
        city: 'Los Angeles',
        addressLine1: '456 West Blvd',
        countryCode: 'US',
        postalCode: '90001',
      },
    ],
    total: 5,
    hasMore: true,
  },
};

const mockWarehousesLoadMore = {
  getAllWarehouses: {
    warehouses: [
      {
        id: '3',
        name: 'Central Distribution',
        city: 'Chicago',
        addressLine1: '789 Central Ave',
        countryCode: 'US',
        postalCode: '60601',
      },
      {
        id: '4',
        name: 'Southern Hub',
        city: 'Houston',
        addressLine1: '321 South St',
        countryCode: 'US',
        postalCode: '77001',
      },
      {
        id: '5',
        name: 'Regional Storage',
        city: 'Miami',
        addressLine1: '654 Beach Dr',
        countryCode: 'US',
        postalCode: '33101',
      },
    ],
    total: 5,
    hasMore: false,
  },
};

const hasMoreMock = {
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
    data: mockWarehousesHasMore,
  },
};

const loadMoreMock = {
  request: {
    query: FindWarehousesDocument,
    variables: {
      page: 2,
      limit: 10,
      name: undefined,
      sortBy: 'NAME',
      sortOrder: 'ASC',
    },
  },
  result: {
    data: mockWarehousesLoadMore,
  },
};

const meta: Meta<typeof WarehouseCombobox> = {
  title: 'Molecules/Inventory/WarehouseCombobox',
  component: WarehouseCombobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The selected warehouse ID',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback when warehouse selection changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <MockedProvider mocks={parameters.mocks || [successMock]}>
        <Story />
      </MockedProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof WarehouseCombobox>;

export const Default: Story = {
  args: {},
  parameters: {
    mocks: [successMock],
  },
};

export const NotFound: Story = {
  args: {},
  parameters: {
    mocks: [emptyMock],
  },
};

export const WithSelectedValue: Story = {
  args: {
    value: '2',
  },
  parameters: {
    mocks: [successMock],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    mocks: [successMock],
  },
};

export const HasMore: Story = {
  render: () => {
    const [selectedWarehouse, setSelectedWarehouse] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useState<string>('');

    return (
      <MockedProvider mocks={[hasMoreMock, loadMoreMock]}>
        <div className="space-y-4">
          <WarehouseCombobox
            value={selectedWarehouse}
            onChange={setSelectedWarehouse}
          />
          <div className="text-muted-foreground text-sm">
            Selected Warehouse ID: {selectedWarehouse || 'None'}
          </div>
        </div>
      </MockedProvider>
    );
  },
};

// Interactive story to demonstrate selection
const InteractiveComponent = () => {
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<string>('');

  return (
    <div className="space-y-4">
      <WarehouseCombobox
        value={selectedWarehouse}
        onChange={setSelectedWarehouse}
      />
      <div className="text-muted-foreground text-sm">
        Selected Warehouse ID: {selectedWarehouse || 'None'}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
  parameters: {
    mocks: [successMock],
  },
};
