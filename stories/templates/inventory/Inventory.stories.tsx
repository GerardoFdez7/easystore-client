import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import InventoryTemplate from '@templates/inventory/Inventory';
import { inventoryMocks, emptyInventoryMocks } from './mocks/inventoryMocks';

const meta: Meta<typeof InventoryTemplate> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('textbox', { name: /search/i }),
    ).toBeInTheDocument();
  },
  component: InventoryTemplate,
  title: 'Templates/Inventory/InventoryTemplate',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ApolloMswMocks mocks={inventoryMocks}>
        <Story />
      </ApolloMswMocks>
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
      <ApolloMswMocks mocks={emptyInventoryMocks}>
        <Story />
      </ApolloMswMocks>
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
