import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderStatus from '@atoms/orders/OrderStatus';
import { OrderStatus as OrderStatusEnum } from '@lib/types/order';

const meta: Meta<typeof OrderStatus> = {
  title: 'Atoms/Orders/OrderStatus',
  component: OrderStatus,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(OrderStatusEnum),
      description: 'The current status of the order',
    },
  },
};

export default meta;

type Story = StoryObj<typeof OrderStatus>;

export const Processing: Story = {
  args: {
    status: OrderStatusEnum.PROCESSING,
  },
};

export const Confirmed: Story = {
  args: {
    status: OrderStatusEnum.CONFIRMED,
  },
};

export const Shipped: Story = {
  args: {
    status: OrderStatusEnum.SHIPPED,
  },
};

export const Completed: Story = {
  args: {
    status: OrderStatusEnum.COMPLETED,
  },
};

export const Cancelled: Story = {
  args: {
    status: OrderStatusEnum.CANCELLED,
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm">Processing:</span>
        <OrderStatus status={OrderStatusEnum.PROCESSING} />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm">Confirmed:</span>
        <OrderStatus status={OrderStatusEnum.CONFIRMED} />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm">Shipped:</span>
        <OrderStatus status={OrderStatusEnum.SHIPPED} />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm">Completed:</span>
        <OrderStatus status={OrderStatusEnum.COMPLETED} />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm">Cancelled:</span>
        <OrderStatus status={OrderStatusEnum.CANCELLED} />
      </div>
    </div>
  ),
};
