import { expect as storybookExpect, within } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InventoryActionButtons from '@molecules/inventory/InventoryActionButtons';

const meta: Meta<typeof InventoryActionButtons> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'History' }),
    ).toBeEnabled();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Add Stock' }),
    ).toBeEnabled();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Manage Warehouses' }),
    ).toBeEnabled();
  },
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
