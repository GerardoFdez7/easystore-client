import type { Meta, StoryObj } from '@storybook/nextjs';
import WarehouseManagementDialog from '@organisms/inventory/WarehouseManagementDialog';
import { mockWarehouses } from './mocks/mockWarehouses';

const meta: Meta<typeof WarehouseManagementDialog> = {
  title: 'Organisms/Inventory/WarehouseManagementDialog',
  component: WarehouseManagementDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive dialog for managing warehouses with search, sort, and CRUD operations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      description: 'Whether the dialog is open',
      control: { type: 'boolean' },
    },
    onOpenChange: {
      description: 'Callback function when dialog open state changes',
      action: 'openChange',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    warehouses: mockWarehouses.warehouses,
    hasMore: mockWarehouses.hasMore,
  },
};

export const Loading: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    open: true,
    warehouses: [],
    onOpenChange: () => {},
  },
};
