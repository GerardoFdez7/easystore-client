import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderDetailsTable from '@molecules/orders/order-detail/OrderDetailsTable';

const meta: Meta<typeof OrderDetailsTable> = {
  title: 'Molecules/Orders/OrderDetail/OrderDetailsTable',
  component: OrderDetailsTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderDetailsTable> = {};
