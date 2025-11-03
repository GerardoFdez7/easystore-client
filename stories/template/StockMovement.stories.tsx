import type { Meta, StoryObj } from '@storybook/nextjs';
import StockMovementTemplate from '@templates/inventory/StockMovement';

const meta: Meta<typeof StockMovementTemplate> = {
  title: 'Templates/StockMovement',
  component: StockMovementTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof StockMovementTemplate>;

export const Default: Story = {};
