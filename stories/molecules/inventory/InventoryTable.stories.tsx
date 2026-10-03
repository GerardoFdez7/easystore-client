import { useState } from 'react';
import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import InventoryTable from '@molecules/inventory/InventoryTable';
import { mockInventoryTableData } from './mocks/inventory-table';
import type { FindInventoryQueryVariables } from '@graphql/generated';
import type { SortField } from '@lib/types/inventory';
import type { SortDirection } from '@lib/types/sort';

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
  onCreateStock: fn(),
  onSortChange: fn(),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    inventory: mockInventoryTableData,
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.getByRole('table')).toBeInTheDocument();
    // One header row plus the first page of 25 items.
    await storybookExpect(canvas.getAllByRole('row')).toHaveLength(26);
    await storybookExpect(
      canvas.getByRole('columnheader', { name: 'SKU' }),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'SKU' }));
    await storybookExpect(args.onSortChange).toHaveBeenCalledWith('sku', 'ASC');

    const selectAll = canvas.getByRole('checkbox', { name: 'Select all rows' });
    const [firstRow] = canvas.getAllByRole('checkbox', { name: 'Select row' });
    await userEvent.click(firstRow);
    await storybookExpect(firstRow).toBeChecked();
    await storybookExpect(selectAll).not.toBeChecked();
    await userEvent.click(selectAll);
    await storybookExpect(selectAll).toBeChecked();
  },
};

export const Empty: Story = {
  args: {
    ...baseArgs,
    inventory: [],
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.queryByRole('table')).toBeNull();
    await storybookExpect(
      canvas.getByRole('heading', { name: 'No Product Variants Found' }),
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Add Stock' }));
    await storybookExpect(args.onCreateStock).toHaveBeenCalledTimes(1);
  },
};

function SortableInventoryTable(
  props: React.ComponentProps<typeof InventoryTable>,
) {
  const [field, setField] = useState<SortField>('variantFirstAttribute');
  const [direction, setDirection] = useState<SortDirection>('ASC');
  const sorted = [...props.inventory].sort((a, b) => {
    const result =
      field === 'sku'
        ? String(a.variantSku).localeCompare(String(b.variantSku))
        : 0;
    return direction === 'ASC' ? result : -result;
  });

  return (
    <InventoryTable
      {...props}
      inventory={sorted}
      sortField={field}
      sortDirection={direction}
      onSortChange={(nextField, nextDirection) => {
        setField(nextField);
        setDirection(nextDirection);
      }}
    />
  );
}

export const KeyboardSorting: Story = {
  args: { ...baseArgs, inventory: mockInventoryTableData.slice(0, 5) },
  render: (args) => <SortableInventoryTable {...args} />,
  play: async ({ canvas }) => {
    const firstRowText = () => canvas.getAllByRole('row')[1].textContent ?? '';
    const skuHeader = canvas.getByRole('columnheader', { name: 'SKU' });
    await storybookExpect(skuHeader).toHaveAttribute('aria-sort', 'none');

    const skuButton = canvas.getByRole('button', { name: 'SKU' });
    skuButton.focus();
    await storybookExpect(skuButton).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await storybookExpect(skuHeader).toHaveAttribute('aria-sort', 'ascending');
    await storybookExpect(firstRowText()).toContain('SKU001');

    await userEvent.keyboard(' ');
    await storybookExpect(skuHeader).toHaveAttribute('aria-sort', 'descending');
    await storybookExpect(firstRowText()).toContain('SKU005');
  },
};
