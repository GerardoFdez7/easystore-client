import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import WarehouseForm from '@molecules/inventory/WarehouseForm';
import { mockWarehouse } from './mocks/warehouseMocks';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import { FindAllAddressesDocument } from '@graphql/generated';
import { mockAddressesData } from './mocks/addressMocks';

const addressesMock = {
  request: {
    query: FindAllAddressesDocument,
    variables: { page: 1, limit: 25, name: '' },
  },
  result: { data: mockAddressesData },
};

const meta: Meta<typeof WarehouseForm> = {
  title: 'Molecules/Inventory/WarehouseForm',
  component: WarehouseForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form component for creating and editing warehouses with address selection and creation capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ApolloMswMocks mocks={[addressesMock]}>
        <Story />
      </ApolloMswMocks>
    ),
  ],
  argTypes: {
    warehouse: {
      description: 'Warehouse data for editing (null for creation)',
      control: { type: 'object' },
    },
    onSubmit: {
      description: 'Callback function when form is submitted',
      action: 'submit',
    },
    onCancel: {
      description: 'Callback function when cancel button is clicked',
      action: 'cancel',
    },
    onDelete: {
      description: 'Callback function when delete button is clicked',
      action: 'delete',
    },
    isSubmitting: {
      description: 'Loading state for form submission',
      control: { type: 'boolean' },
    },
    isDeleting: {
      description: 'Loading state for delete operation',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onSubmit: fn(async () => undefined),
    onCancel: fn(),
    isSubmitting: false,
    isDeleting: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in default mode for creating a new warehouse.',
      },
    },
  },
  play: async ({ args }) => {
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toHaveTextContent('Create Warehouse');
    await storybookExpect(
      screen.queryByRole('button', { name: 'Delete Warehouse' }),
    ).toBeNull();

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Warehouse Name' }),
      'A',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    await storybookExpect(
      await screen.findByText('Warehouse name must be at least 2 characters'),
    ).toBeInTheDocument();
    await storybookExpect(
      screen.getByText('Address is required'),
    ).toBeInTheDocument();
    await storybookExpect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const EditMode: Story = {
  args: {
    open: true,
    warehouse: mockWarehouse,
    onSubmit: fn(async () => undefined),
    onCancel: fn(),
    onDelete: fn(async () => true),
    isSubmitting: false,
    isDeleting: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in edit mode with existing warehouse data.',
      },
    },
  },
  play: async ({ args }) => {
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toHaveTextContent('Edit Warehouse');
    await storybookExpect(
      screen.getByRole('textbox', { name: 'Warehouse Name' }),
    ).toHaveValue('Main Warehouse');
    // Nothing changed yet, so saving is disabled.
    await storybookExpect(
      screen.getByRole('button', { name: 'Save' }),
    ).toBeDisabled();

    await userEvent.click(
      screen.getByRole('button', { name: 'Delete Warehouse' }),
    );
    const confirm = await screen.findByRole('alertdialog');
    await storybookExpect(confirm).toHaveTextContent(
      'Confirm Delete Warehouse',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      storybookExpect(args.onDelete).toHaveBeenCalledWith(mockWarehouse.id),
    );
    await waitFor(() => storybookExpect(args.onCancel).toHaveBeenCalled());
  },
};

export const Submitting: Story = {
  args: {
    open: true,
    warehouse: mockWarehouse,
    onSubmit: fn(async () => undefined),
    onCancel: fn(),
    onDelete: fn(async () => true),
    isSubmitting: true,
    isDeleting: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in submitting state with loading indicators.',
      },
    },
  },
  play: async () => {
    await screen.findByRole('dialog');
    await storybookExpect(
      screen.getByRole('button', { name: 'Loading Save' }),
    ).toBeDisabled();
    await storybookExpect(
      screen.getByRole('button', { name: 'Delete Warehouse' }),
    ).toBeDisabled();
  },
};

export const Deleting: Story = {
  args: {
    open: true,
    warehouse: mockWarehouse,
    onSubmit: fn(async () => undefined),
    onCancel: fn(),
    onDelete: fn(async () => true),
    isSubmitting: false,
    isDeleting: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in deleting state with loading indicators.',
      },
    },
  },
  play: async () => {
    await screen.findByRole('dialog');
    await storybookExpect(
      screen.getByRole('button', { name: 'Delete Warehouse' }),
    ).toBeDisabled();
  },
};
