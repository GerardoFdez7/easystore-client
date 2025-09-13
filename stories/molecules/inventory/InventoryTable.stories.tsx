import { Meta, StoryObj } from '@storybook/react';
import InventoryTable from '@molecules/inventory/InventoryTable';
import { FindInventoryQueryVariables } from '@graphql/generated';
import { useInventoryStorybook } from './hooks/useInventoryStorybook';
import React from 'react';
import { mockInventoryTableData } from '@lib/utils';

// Wrapper component for Storybook that uses the non-suspense hook
const InventoryTableStorybook = (
  props: React.ComponentProps<typeof InventoryTable>,
) => {
  const { inventory, loading, error } = useInventoryStorybook(
    props.variables,
    props.inventory,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <InventoryTable {...props} inventory={inventory} />;
};

const meta: Meta<typeof InventoryTableStorybook> = {
  title: 'Molecules/Inventory/InventoryTable',
  component: InventoryTableStorybook,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InventoryTableStorybook>;

const variables: FindInventoryQueryVariables = {};

export const Default: Story = {
  args: {
    variables: variables,
    inventory: mockInventoryTableData,
  },
};
