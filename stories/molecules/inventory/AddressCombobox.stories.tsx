/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { MockedProvider } from '@apollo/client/testing/react';
import AddressCombobox from '@molecules/inventory/AddressCombobox';
import { FindAllAddressesDocument } from '@graphql/generated';
import {
  mockAddressesData,
  mockAddressesWithMore,
  mockAddressesLoadMore,
} from './mocks/addressMocks';

// Mock for empty results
const emptyMock = {
  request: {
    query: FindAllAddressesDocument,
    variables: {
      page: 1,
      limit: 25,
    },
  },
  result: {
    data: {
      getAllAddresses: {
        addresses: [],
        total: 0,
        hasMore: false,
      },
    },
  },
};

// Mock for successful query
const successMock = {
  request: {
    query: FindAllAddressesDocument,
    variables: {
      page: 1,
      limit: 25,
    },
  },
  result: {
    data: mockAddressesData,
  },
};

// Mock for pagination - first page with hasMore: true
const hasMoreMock = {
  request: {
    query: FindAllAddressesDocument,
    variables: {
      page: 1,
      limit: 25,
    },
  },
  result: {
    data: mockAddressesWithMore,
  },
};

// Mock for pagination - second page
const loadMoreMock = {
  request: {
    query: FindAllAddressesDocument,
    variables: {
      page: 2,
      limit: 25,
    },
  },
  result: {
    data: mockAddressesLoadMore,
  },
};

// Mock for search functionality
const searchMock = {
  request: {
    query: FindAllAddressesDocument,
    variables: {
      page: 1,
      limit: 25,
      name: 'Main',
    },
  },
  result: {
    data: {
      getAllAddresses: {
        addresses: [
          {
            id: '1',
            name: 'Main Office',
            addressLine1: '123 Business Street',
            addressLine2: 'Suite 100',
            city: 'New York',
            postalCode: '10001',
            countryId: 'us',
            stateId: 'ny',
            addressType: 'BUSINESS',
            deliveryNum: null,
            deliveryInstructions: 'Ring doorbell twice',
          },
        ],
        total: 1,
        hasMore: false,
      },
    },
  },
};

// Mock for error state
const errorMock = {
  request: {
    query: FindAllAddressesDocument,
    variables: {
      page: 1,
      limit: 25,
    },
  },
};

const meta: Meta<typeof AddressCombobox> = {
  title: 'Molecules/Inventory/AddressCombobox',
  component: AddressCombobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The AddressCombobox component provides a searchable dropdown for selecting addresses. 
It supports server-side search, infinite scrolling for pagination, and various states 
including loading, empty, and error states.

## Features
- Server-side search with debouncing
- Infinite scrolling for large datasets
- Loading and error state handling
- Customizable placeholder and styling
- Disabled state support
- Internationalization support
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The selected address ID',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'onChange',
      description: 'Callback function called when address selection changes',
      table: {
        type: { summary: '(addressId: string) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Custom placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the combobox (string or number)',
      table: {
        type: { summary: 'string | number' },
      },
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

type Story = StoryObj<typeof AddressCombobox>;

export const Default: Story = {
  args: {},
  parameters: {
    mocks: [successMock],
    docs: {
      description: {
        story: 'Default state with loaded addresses available for selection.',
      },
    },
  },
};

export const WithSelectedValue: Story = {
  args: {
    value: '2',
  },
  parameters: {
    mocks: [successMock],
    docs: {
      description: {
        story: 'Combobox with a pre-selected address value.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '1',
  },
  parameters: {
    mocks: [successMock],
    docs: {
      description: {
        story: 'Disabled state - user cannot interact with the combobox.',
      },
    },
  },
};

export const Empty: Story = {
  args: {},
  parameters: {
    mocks: [emptyMock],
    docs: {
      description: {
        story: 'Empty state when no addresses are found.',
      },
    },
  },
};

export const Error: Story = {
  args: {},
  parameters: {
    mocks: [errorMock],
    docs: {
      description: {
        story: 'Error state when address loading fails.',
      },
    },
  },
};

export const WithPagination: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <AddressCombobox
        value={value}
        onChange={setValue}
        placeholder="Select address with pagination..."
      />
    );
  },
  parameters: {
    mocks: [hasMoreMock, loadMoreMock],
    docs: {
      description: {
        story:
          'Demonstrates infinite scrolling when there are more addresses to load.',
      },
    },
  },
};

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <AddressCombobox
        value={value}
        onChange={setValue}
        placeholder="Search for addresses..."
      />
    );
  },
  parameters: {
    mocks: [successMock, searchMock],
    docs: {
      description: {
        story:
          'Demonstrates server-side search functionality. Try typing "Main" to see filtered results.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <div className="space-y-4">
        <AddressCombobox
          value={value}
          onChange={setValue}
          placeholder="Interactive address selection..."
        />
        <div className="text-sm text-gray-600">
          Selected address ID: {value || 'None'}
        </div>
      </div>
    );
  },
  parameters: {
    mocks: [successMock],
    docs: {
      description: {
        story:
          'Interactive example showing the selected value and allowing full interaction.',
      },
    },
  },
};
