import type { Meta, StoryObj } from '@storybook/nextjs';
import Promotion from '@atoms/orders/order-detail/Promotion';

const meta: Meta<typeof Promotion> = {
  title: 'Atoms/Orders/OrderDetail/Promotion',
  component: Promotion,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    className: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Default: StoryObj<typeof Promotion> = {
  args: {
    title: 'Free Shipping Promotion',
    description: '',
    className: 'w-80 h-16 flex items-center justify-center text-lg',
  },
};
