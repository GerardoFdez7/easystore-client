import type { Meta, StoryObj } from '@storybook/nextjs';
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
    <div className="w-[800px]">
      <StockHeader {...args} />
    </div>
  ),
};

export const Minimal: Story = {
  args: {
    ...mockStockHeaderMinimal,
  },
  render: (args) => (
    <div className="w-[800px]">
      <StockHeader {...args} />
    </div>
  ),
};

export const NoAttributes: Story = {
  args: {
    ...mockStockHeaderNoAttributes,
  },
  render: (args) => (
    <div className="w-[800px]">
      <StockHeader {...args} />
    </div>
  ),
};

export const NoWarehouse: Story = {
  args: {
    ...mockStockHeaderNoWarehouse,
  },
  render: (args) => (
    <div className="w-[800px]">
      <StockHeader {...args} />
    </div>
  ),
};

export const OnlySKU: Story = {
  args: {
    ...mockStockHeaderOnlySKU,
  },
  render: (args) => (
    <div className="w-[800px]">
      <StockHeader {...args} />
    </div>
  ),
};
