import { Meta, StoryObj } from '@storybook/nextjs';
import InventoryTable from '@molecules/inventory/InventoryTable';
import { FindInventoryQueryVariables } from '@graphql/generated';
import { useInventoryStorybook } from './hooks/useInventoryStorybook';
import { ComponentProps } from 'react';
import { mockInventoryTableData } from './mocks/inventory-table';

// Wrapper component for Storybook that uses the non-suspense hook
const InventoryTableStorybook = (
  props: ComponentProps<typeof InventoryTable>,
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

export const Empty: Story = {
  args: {
    variables: variables,
    inventory: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates the empty state of the InventoryTable component. The empty state is displayed when the `inventory` prop is an empty array. It shows a message indicating no product variants were found and provides a button to add stock.',
      },
    },
  },
};
