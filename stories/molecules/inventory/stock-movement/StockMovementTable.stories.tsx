import type { Meta, StoryObj } from '@storybook/nextjs';
import StockMovementTable from '@molecules/inventory/stock-movement/StockMovementTable';
import {
  mockStockMovements,
  mockEmptyStockMovements,
} from '../mocks/stockMovementMocks';

const meta: Meta<typeof StockMovementTable> = {
  title: 'Molecules/Inventory/History/StockMovementTable',
  component: StockMovementTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the table container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    stockMovements: {
      control: false,
      description: 'Array of stock movement items to display in the table.',
      table: {
        type: { summary: 'StockMovementItem[]' },
      },
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current page number for pagination.',
      table: {
        type: { summary: 'number' },
      },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages available.',
      table: {
        type: { summary: 'number' },
      },
    },
    totalRows: {
      control: { type: 'number', min: 0 },
      description: 'Total number of rows across all pages.',
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    className: '',
    stockMovements: mockStockMovements,
    currentPage: 1,
    totalPages: 3,
    totalRows: 12,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export default meta;

type Story = StoryObj<typeof StockMovementTable>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-[1200px]">
      <StockMovementTable {...args} />
    </div>
  ),
};

export const EmptyState: Story = {
  args: {
    stockMovements: mockEmptyStockMovements,
    currentPage: 1,
    totalPages: 1,
    totalRows: 0,
  },
  render: (args) => (
    <div className="w-[1200px]">
      <StockMovementTable {...args} />
    </div>
  ),
};

export const SinglePage: Story = {
  args: {
    stockMovements: mockStockMovements.slice(0, 3),
    currentPage: 1,
    totalPages: 1,
    totalRows: 3,
  },
  render: (args) => (
    <div className="w-[1200px]">
      <StockMovementTable {...args} />
    </div>
  ),
};
