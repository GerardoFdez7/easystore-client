import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
    onPageChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof StockMovementTable>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-300">
      <StockMovementTable {...args} />
    </div>
  ),
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.getByRole('table')).toBeInTheDocument();
    await storybookExpect(canvas.getAllByRole('row')).toHaveLength(
      mockStockMovements.length + 1,
    );
    await storybookExpect(canvas.getByText('-5')).toBeInTheDocument();
    await storybookExpect(canvas.getByText('+10')).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole('button', {
        name: 'Sale through online store - Order #12345',
      }),
    );
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toHaveTextContent(
      'Sale through online store - Order #12345',
    );
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      storybookExpect(screen.queryByRole('dialog')).toBeNull(),
    );

    await userEvent.click(canvas.getByRole('button', { name: /next/i }));
    await storybookExpect(args.onPageChange).toHaveBeenCalledWith(2);
  },
};

export const EmptyState: Story = {
  args: {
    stockMovements: mockEmptyStockMovements,
    currentPage: 1,
    totalPages: 1,
    totalRows: 0,
  },
  render: (args) => (
    <div className="w-300">
      <StockMovementTable {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(canvas.queryByRole('table')).toBeNull();
    await storybookExpect(
      canvas.getByRole('heading', { name: 'No Stock Movements Found' }),
    ).toBeInTheDocument();
  },
};

export const SinglePage: Story = {
  args: {
    stockMovements: mockStockMovements.slice(0, 3),
    currentPage: 1,
    totalPages: 1,
    totalRows: 3,
  },
  render: (args) => (
    <div className="w-300">
      <StockMovementTable {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('row')).toHaveLength(4);
    await storybookExpect(
      canvas.getByRole('button', { name: /next/i }),
    ).toBeDisabled();
  },
};
