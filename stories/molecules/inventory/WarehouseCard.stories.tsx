import type { Meta, StoryObj } from '@storybook/nextjs';
import WarehouseCard from '@molecules/inventory/WarehouseCard';
import { mockWarehouse } from './mocks/warehouseMocks';

const meta: Meta<typeof WarehouseCard> = {
  title: 'Molecules/Inventory/WarehouseCard',
  component: WarehouseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card component for displaying warehouse information with edit and delete actions.',
      },
    },
  },

  tags: ['autodocs'],
  argTypes: {
    warehouse: {
      description: 'Warehouse data object',
      control: { type: 'object' },
    },
    onEdit: {
      description: 'Callback function when edit button is clicked',
      action: 'edit',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    warehouse: mockWarehouse,
  },
};

export const LongContent: Story = {
  args: {
    warehouse: {
      ...mockWarehouse,
      name: 'Very Long Warehouse Name That Might Overflow The Card Layout',
    },
  },
};
