import type { Meta, StoryObj } from '@storybook/nextjs';
import StockDetailTemplate from '@templates/StockDetail';

const meta: Meta<typeof StockDetailTemplate> = {
  title: 'Templates/StockDetail',
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
    warehouseSku: 'central-warehouse_ABC-123',
  },
};
