import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
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
      name: '',
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
      name: '',
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
      name: '',
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
      name: '',
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
      name: '',
    },
  },
  error: new globalThis.Error('Failed to load addresses'),
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
      <ApolloMswMocks mocks={parameters.mocks || [successMock]}>
        <Story />
      </ApolloMswMocks>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AddressCombobox>;

// Radix hides the page behind an open popover; close it so only the settled
// state is audited for accessibility.
async function closePopover() {
  await userEvent.keyboard('{Escape}{Escape}');
  await waitFor(() =>
    storybookExpect(screen.queryByRole('listbox')).toBeNull(),
  );
}

// The trigger stays disabled while the addresses query is loading.
async function findEnabledTrigger(
  canvas: Parameters<NonNullable<Story['play']>>[0]['canvas'],
  name: string,
) {
  const trigger = await canvas.findByRole('combobox', { name });
  await waitFor(() => storybookExpect(trigger).toBeEnabled());
  return trigger;
}

export const Default: Story = {
  args: { onChange: fn() },
  parameters: {
    mocks: [successMock],
    docs: {
      description: {
        story: 'Default state with loaded addresses available for selection.',
      },
    },
  },
  play: async ({ canvas, args }) => {
    const trigger = await findEnabledTrigger(canvas, 'Select Address');
    await userEvent.click(trigger);
    await userEvent.click(
      await screen.findByRole('option', { name: /Warehouse A/ }),
    );
    await storybookExpect(args.onChange).toHaveBeenCalledWith('2');
    await closePopover();
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
  play: async ({ canvas }) => {
    const trigger = await canvas.findByRole('combobox');
    await waitFor(() =>
      storybookExpect(trigger).toHaveTextContent(
        'Warehouse A, 456 Storage Avenue, Los Angeles, 90001',
      ),
    );
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
  play: async ({ canvas }) => {
    await storybookExpect(await canvas.findByRole('combobox')).toBeDisabled();
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
  play: async ({ canvas }) => {
    const trigger = await findEnabledTrigger(canvas, 'Select Address');
    await userEvent.click(trigger);
    await storybookExpect(
      await screen.findByText('No addresses found'),
    ).toBeInTheDocument();
    await storybookExpect(screen.queryAllByRole('option')).toHaveLength(0);
    await closePopover();
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
  play: async ({ canvas }) => {
    const trigger = await findEnabledTrigger(canvas, 'Select Address');
    await userEvent.click(trigger);
    await storybookExpect(
      await screen.findByText('No addresses found'),
    ).toBeInTheDocument();
    await closePopover();
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
  play: async ({ canvas }) => {
    const trigger = await findEnabledTrigger(
      canvas,
      'Select address with pagination...',
    );
    await userEvent.click(trigger);
    await storybookExpect(
      await screen.findByRole('option', { name: /Warehouse A/ }),
    ).toBeInTheDocument();
    await storybookExpect(
      screen.queryByRole('option', { name: /Regional Hub/ }),
    ).toBeNull();

    await userEvent.click(screen.getByRole('button', { name: 'Load More' }));
    await storybookExpect(
      await screen.findByRole('option', { name: /Regional Hub/ }),
    ).toBeInTheDocument();
    await closePopover();
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
  play: async ({ canvas }) => {
    const trigger = await findEnabledTrigger(canvas, 'Search for addresses...');
    await userEvent.click(trigger);
    await storybookExpect(
      await screen.findByRole('option', { name: /Warehouse A/ }),
    ).toBeInTheDocument();

    await userEvent.type(
      screen.getByPlaceholderText('Search addresses...'),
      'Main',
    );
    await waitFor(() =>
      storybookExpect(screen.getAllByRole('option')).toHaveLength(1),
    );
    await storybookExpect(
      screen.getByRole('option', { name: /Main Office/ }),
    ).toBeInTheDocument();
    await closePopover();
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
        <div className="text-foreground text-sm">
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
  play: async ({ canvas }) => {
    const trigger = await findEnabledTrigger(
      canvas,
      'Interactive address selection...',
    );
    await storybookExpect(
      canvas.getByText('Selected address ID: None'),
    ).toBeInTheDocument();
    await userEvent.click(trigger);
    await userEvent.click(
      await screen.findByRole('option', { name: /Distribution Center/ }),
    );
    await storybookExpect(
      canvas.getByText('Selected address ID: 3'),
    ).toBeInTheDocument();
    await closePopover();
  },
};
