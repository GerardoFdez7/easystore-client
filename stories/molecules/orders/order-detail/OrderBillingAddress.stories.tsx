import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderBillingAddress from '@molecules/orders/order-detail/OrderBillingAddress';

const meta: Meta<typeof OrderBillingAddress> = {
  title: 'Molecules/Orders/OrderDetail/OrderBillingAddress',
  component: OrderBillingAddress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderBillingAddress> = {};
