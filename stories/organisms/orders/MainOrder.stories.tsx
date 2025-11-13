import type { Meta, StoryObj } from '@storybook/nextjs';
import MainOrder from '@organisms/orders/MainOrder';

const meta: Meta<typeof MainOrder> = {
  title: 'Organisms/Orders/MainOrder',
  component: MainOrder,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MainOrder>;

export const Default: Story = {};

export const WithOrders: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Main order page displaying a table with multiple orders and pagination.',
      },
    },
  },
};
