import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderCouponsPromotions from '@molecules/orders/order-detail/OrderCouponsPromotions';

const meta: Meta<typeof OrderCouponsPromotions> = {
  title: 'Molecules/Orders/OrderDetail/OrderCouponsPromotions',
  component: OrderCouponsPromotions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof OrderCouponsPromotions> = {};
