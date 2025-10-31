import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderShippingAddress from '@molecules/orders/order-detail/OrderShippingAddress';

const meta: Meta<typeof OrderShippingAddress> = {
  title: 'Molecules/Orders/OrderDetail/OrderShippingAddress',
  component: OrderShippingAddress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderShippingAddress> = {};
