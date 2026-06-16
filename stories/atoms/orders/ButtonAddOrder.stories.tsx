import type { Meta, StoryObj } from '@storybook/nextjs';
import ButtonAddOrder from '@atoms/orders/ButtonAddOrder';

const meta: Meta<typeof ButtonAddOrder> = {
  title: 'Atoms/Orders/ButtonAddOrder',
  component: ButtonAddOrder,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ButtonAddOrder>;

export const Default: Story = {};
