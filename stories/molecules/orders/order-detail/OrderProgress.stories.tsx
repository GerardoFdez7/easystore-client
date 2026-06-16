import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderProgress from '@molecules/orders/order-detail/OrderProgress';

const meta: Meta<typeof OrderProgress> = {
  title: 'Molecules/Orders/OrderDetail/OrderProgress',
  component: OrderProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderProgress> = {};
