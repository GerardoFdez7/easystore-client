import type { Meta, StoryObj } from '@storybook/nextjs';
import Coupon from '@atoms/orders/order-detail/Coupon';

const meta: Meta<typeof Coupon> = {
  title: 'Atoms/Orders/OrderDetail/Coupon',
  component: Coupon,
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text' },
    description: { control: 'text' },
    className: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof Coupon> = {
  args: {
    code: 'SAVE10',
    description: '10% off',
  },
};
