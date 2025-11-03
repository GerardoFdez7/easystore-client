import type { Meta, StoryObj } from '@storybook/nextjs';
import { MockedProvider } from '@apollo/client/testing/react';
import InventoryTemplate from '@templates/inventory/Inventory';
import { inventoryMocks, emptyInventoryMocks } from './mocks/inventoryMocks';

const meta: Meta<typeof InventoryTemplate> = {
  component: InventoryTemplate,
  title: 'Templates/Inventory',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockedProvider mocks={inventoryMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InventoryTemplate>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Default inventory template with populated warehouse and stock data.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {},
  decorators: [
    (Story) => (
      <MockedProvider mocks={emptyInventoryMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Inventory template showing empty state when no warehouses or stock exist.',
      },
    },
  },
};
