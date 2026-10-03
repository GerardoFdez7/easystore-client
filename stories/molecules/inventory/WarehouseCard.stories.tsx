import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
    onEdit: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Main Warehouse' }),
    ).toBeInTheDocument();
    const card = canvas.getByRole('button', { name: 'Edit Warehouse' });
    await userEvent.click(card);
    await storybookExpect(args.onEdit).toHaveBeenCalledWith(mockWarehouse);

    card.focus();
    await userEvent.keyboard('{Enter}');
    await storybookExpect(args.onEdit).toHaveBeenCalledTimes(2);
  },
};

export const LongContent: Story = {
  args: {
    onEdit: fn(),
    warehouse: {
      ...mockWarehouse,
      name: 'Very Long Warehouse Name That Might Overflow The Card Layout',
    },
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('heading', {
        name: 'Very Long Warehouse Name That Might Overflow The Card Layout',
      }),
    ).toBeInTheDocument();
  },
};
