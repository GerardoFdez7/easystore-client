import type { Meta, StoryObj } from '@storybook/nextjs';
import { MockedProvider } from '@apollo/client/testing/react';
import StockDetailTemplate from '@templates/inventory/StockDetail';
import { stockDetailMocks } from './mocks/stockDetailMocks';

const meta: Meta<typeof StockDetailTemplate> = {
  title: 'Templates/Inventory/Detail/StockDetail',
  component: StockDetailTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof StockDetailTemplate>;

export const Default: Story = {
  args: {
    warehouseSku: 'Main Warehouse_SKU-001-RED',
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={stockDetailMocks}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Stock detail template for editing existing stock with pre-filled data.',
      },
    },
  },
};
