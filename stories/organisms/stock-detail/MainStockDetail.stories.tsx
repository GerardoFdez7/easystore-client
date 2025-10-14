import type { Meta, StoryObj } from '@storybook/nextjs';
import MainStockDetail from '@organisms/inventory/stock-detail/MainStockDetail';

const meta: Meta<typeof MainStockDetail> = {
  title: 'Organisms/StockDetail/MainStockDetail',
  component: MainStockDetail,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MainStockDetail>;

export const Default: Story = {
  args: {
    warehouseName: 'central-warehouse',
    sku: 'ABC-123',
  },
};
