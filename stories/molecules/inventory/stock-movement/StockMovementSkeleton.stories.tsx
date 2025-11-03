import type { Meta, StoryObj } from '@storybook/nextjs';
import StockMovementSkeleton from '@molecules/inventory/stock-movement/StockMovementSkeleton';

const meta: Meta<typeof StockMovementSkeleton> = {
  title: 'Molecules/Inventory/History/StockMovementSkeleton',
  component: StockMovementSkeleton,
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
      control: { type: 'number', min: 1, max: 50 },
      description: 'Number of skeleton rows to display in the table.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '25' },
      },
    },
  },
  args: {
    className: '',
    rows: 8,
  },
};

export default meta;

type Story = StoryObj<typeof StockMovementSkeleton>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-[1000px]">
      <StockMovementSkeleton {...args} />
    </div>
  ),
};

export const WithFewerRows: Story = {
  args: {
    rows: 3,
  },
  render: (args) => (
    <div className="w-[1000px]">
      <StockMovementSkeleton {...args} />
    </div>
  ),
};

export const WithMoreRows: Story = {
  args: {
    rows: 15,
  },
  render: (args) => (
    <div className="w-[1000px]">
      <StockMovementSkeleton {...args} />
    </div>
  ),
};
