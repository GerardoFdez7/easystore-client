import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderPayments from '@molecules/orders/order-detail/OrderPayments';

const meta: Meta<typeof OrderPayments> = {
  title: 'Molecules/Orders/OrderDetail/OrderPayments',
  component: OrderPayments,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderPayments> = {};
