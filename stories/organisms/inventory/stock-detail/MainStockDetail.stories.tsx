import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MainStockDetail from '@organisms/inventory/stock-detail/MainStockDetail';

const meta: Meta<typeof MainStockDetail> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: /Warehouse: central warehouse/i }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Inventory/Detail/MainStockDetail',
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
