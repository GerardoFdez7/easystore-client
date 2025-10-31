import type { Meta, StoryObj } from '@storybook/nextjs';
import MainOrderDetail from '@organisms/orders/order-detail/MainOrderDetail';

const meta: Meta<typeof MainOrderDetail> = {
  title: 'Organisms/Orders/OrderDetail/MainOrderDetail',
  component: MainOrderDetail,
  tags: ['autodocs'],
  argTypes: {
    param: { control: 'text', description: 'Order number or ID' },
  },
};
export default meta;

export const Default: StoryObj<typeof MainOrderDetail> = {
  args: {
    param: '12345',
  },
};
