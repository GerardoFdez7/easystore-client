import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderCustomer from '@molecules/orders/order-detail/OrderCustomer';

const meta: Meta<typeof OrderCustomer> = {
  title: 'Molecules/Orders/OrderDetail/OrderCustomer',
  component: OrderCustomer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderCustomer> = {};
