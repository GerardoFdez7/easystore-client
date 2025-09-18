import type { Meta, StoryObj } from '@storybook/nextjs';
import InventoryTableSkeleton from '@molecules/inventory/InventoryTableSkeleton';

const meta: Meta<typeof InventoryTableSkeleton> = {
  title: 'Molecules/Inventory/InventoryTableSkeleton',
  component: InventoryTableSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the skeleton container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rows: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of skeleton rows to display in the table.',
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    className: '',
    rows: 8,
  },
};

export default meta;

type Story = StoryObj<typeof InventoryTableSkeleton>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-[800px]">
      <InventoryTableSkeleton {...args} />
    </div>
  ),
};

export const WithFewerRows: Story = {
  args: {
    rows: 3,
  },
  render: (args) => (
    <div className="w-[800px]">
      <InventoryTableSkeleton {...args} />
    </div>
  ),
};

export const WithMoreRows: Story = {
  args: {
    rows: 10,
  },
  render: (args) => (
    <div className="w-[800px]">
      <InventoryTableSkeleton {...args} />
    </div>
  ),
};
