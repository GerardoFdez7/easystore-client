import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderReturns from '@molecules/orders/order-detail/OrderReturns';

const meta: Meta<typeof OrderReturns> = {
  title: 'Molecules/Orders/OrderDetail/OrderReturns',
  component: OrderReturns,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderReturns> = {};
