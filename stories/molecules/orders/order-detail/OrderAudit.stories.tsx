import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderAudit from '@molecules/orders/order-detail/OrderAudit';

const meta: Meta<typeof OrderAudit> = {
  title: 'Molecules/Orders/OrderDetail/OrderAudit',
  component: OrderAudit,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderAudit> = {};
