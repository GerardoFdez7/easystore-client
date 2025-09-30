import { Meta, StoryObj } from '@storybook/nextjs';
import InventoryActionButtons from '@molecules/inventory/InventoryActionButtons';

const meta: Meta<typeof InventoryActionButtons> = {
  title: 'Molecules/Inventory/InventoryActionButtons',
  component: InventoryActionButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InventoryActionButtons>;

export const Default: Story = {
  args: {
    loading: false,
    onAddStockClick: () => alert('Add Stock Clicked'),
    onManageWarehousesClick: () => alert('Manage Warehouses Clicked'),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onAddStockClick: () => alert('Add Stock Clicked'),
    onManageWarehousesClick: () => alert('Manage Warehouses Clicked'),
  },
};
