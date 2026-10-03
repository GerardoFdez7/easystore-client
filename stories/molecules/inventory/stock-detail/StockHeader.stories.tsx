import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StockHeader from '@molecules/inventory/stock-detail/StockHeader';
import {
  mockStockHeaderData,
  mockStockHeaderMinimal,
  mockStockHeaderNoAttributes,
  mockStockHeaderNoWarehouse,
  mockStockHeaderOnlySKU,
} from '../mocks/stockDetailMocks';

const meta: Meta<typeof StockHeader> = {
  title: 'Molecules/Inventory/Detail/StockHeader',
  component: StockHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    productName: {
      control: 'text',
      description: 'The name of the product.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    sku: {
      control: 'text',
      description: 'The SKU (Stock Keeping Unit) of the product variant.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    attributes: {
      control: false,
      description: 'Array of variant attributes (key-value pairs).',
      table: {
        type: { summary: 'VariantAttribute[]' },
        defaultValue: { summary: '[]' },
      },
    },
    warehouseName: {
      control: 'text',
      description: 'The name of the warehouse where the stock is located.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    colorValue: {
      control: 'text',
      description: 'Color value (currently unused in component).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    ...mockStockHeaderData,
  },
};

export default meta;

type Story = StoryObj<typeof StockHeader>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-200">
      <StockHeader {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    const headings = canvas.getAllByRole('heading');
    await storybookExpect(headings[0]).toHaveTextContent('SKU: [WBH-001-BLK]');
    await storybookExpect(headings[1]).toHaveTextContent(
      'Warehouse: Main Warehouse',
    );
    await storybookExpect(canvas.getByText('Color: Black')).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Connectivity: Bluetooth 5.0'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Wireless Bluetooth Headphones'),
    ).toBeInTheDocument();
  },
};

export const Minimal: Story = {
  args: {
    ...mockStockHeaderMinimal,
  },
  render: (args) => (
    <div className="w-200">
      <StockHeader {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('heading')[0]).toHaveTextContent(
      'SKU: [USB-2M]',
    );
    await storybookExpect(canvas.getByText('USB Cable')).toBeInTheDocument();
    await storybookExpect(canvas.queryByText(/Color:/)).toBeNull();
  },
};

export const NoAttributes: Story = {
  args: {
    ...mockStockHeaderNoAttributes,
  },
  render: (args) => (
    <div className="w-200">
      <StockHeader {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('heading')[0]).toHaveTextContent(
      'SKU: [LS-ADJ-001]',
    );
    await storybookExpect(canvas.getByText('Laptop Stand')).toBeInTheDocument();
  },
};

export const NoWarehouse: Story = {
  args: {
    ...mockStockHeaderNoWarehouse,
    warehouseName: undefined,
  },
  render: (args) => (
    <div className="w-200">
      <StockHeader {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('heading')).toHaveLength(1);
    await storybookExpect(canvas.queryByText(/Warehouse:/)).toBeNull();
    await storybookExpect(
      canvas.getByText('Model: iPhone 15'),
    ).toBeInTheDocument();
  },
};

export const OnlySKU: Story = {
  args: {
    ...mockStockHeaderOnlySKU,
    productName: undefined,
  },
  render: (args) => (
    <div className="w-200">
      <StockHeader {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('heading')[0]).toHaveTextContent(
      'SKU: [TEST-001]',
    );
    await storybookExpect(canvas.queryByText(/Product:/)).toBeNull();
  },
};
