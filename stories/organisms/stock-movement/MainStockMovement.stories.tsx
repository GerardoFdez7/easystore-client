import type { Meta, StoryObj } from '@storybook/nextjs';
import MainStockMovement from '@organisms/inventory/stock-movement/MainStockMovement';

const meta: Meta<typeof MainStockMovement> = {
  title: 'Organisms/StockMovement/MainStockMovement',
  component: MainStockMovement,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MainStockMovement>;

export const Default: Story = {};
