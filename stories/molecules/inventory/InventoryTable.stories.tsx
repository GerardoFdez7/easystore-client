import type { Meta, StoryObj } from '@storybook/nextjs';
import InventoryTable from '@molecules/inventory/InventoryTable';
import { mockInventoryTableData } from './mocks/inventory-table';
import type { InventoryItem } from '@lib/types/inventory';
import type { FindInventoryQueryVariables } from '@graphql/generated';

const meta: Meta<typeof InventoryTable> = {
  title: 'Molecules/Inventory/InventoryTable',
  component: InventoryTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InventoryTable>;

const variables: FindInventoryQueryVariables = {
  page: 1,
  limit: 25,
} as FindInventoryQueryVariables;

const baseArgs = {
  variables,
  onCreateStock: () => alert('Create stock'),
  onEditRow: (row: InventoryItem) => alert(`Edit ${row.variantSku}`),
  onDeleteRow: (row: InventoryItem) => alert(`Delete ${row.variantSku}`),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    inventory: mockInventoryTableData,
  },
};

export const Empty: Story = {
  args: {
    ...baseArgs,
    inventory: [],
  },
};
