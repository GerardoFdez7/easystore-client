import type { Meta, StoryObj } from '@storybook/react';
import InventoryTemplate from '@templates/Inventory';

const meta: Meta<typeof InventoryTemplate> = {
  component: InventoryTemplate,
  title: 'Templates/Inventory',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InventoryTemplate>;

export const Default: Story = {
  args: {},
};
