import type { Meta, StoryObj } from '@storybook/nextjs';
import WarehouseForm from '@molecules/inventory/WarehouseForm';
import { mockWarehouse } from './mocks/warehouseMocks';

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
    onSubmit: async () => {},
    onCancel: () => {},
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
};

export const EditMode: Story = {
  args: {
    warehouse: mockWarehouse,
    onSubmit: async () => {},
    onCancel: () => {},
    onDelete: async () => {},
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
};

export const Submitting: Story = {
  args: {
    warehouse: mockWarehouse,
    onSubmit: async () => {},
    onCancel: () => {},
    onDelete: async () => {},
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
};

export const Deleting: Story = {
  args: {
    warehouse: mockWarehouse,
    onSubmit: async () => {},
    onCancel: () => {},
    onDelete: async () => {},
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
};
