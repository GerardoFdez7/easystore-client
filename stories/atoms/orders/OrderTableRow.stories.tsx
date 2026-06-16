import { OrderTableRow } from '@atoms/orders/OrderTableRow';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Table, TableBody } from '@shadcn/ui/table';
import { Order, OrderStatus } from '@lib/types/order';

const meta: Meta<typeof OrderTableRow> = {
  title: 'Atoms/Orders/OrderTableRow',
  component: OrderTableRow,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <Table>
        <TableBody>
          <Story />
        </TableBody>
      </Table>
    ),
  ],
  argTypes: {
    order: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof OrderTableRow>;

const mockOrder: Order = {
  id: '1',
  orderNumber: 'ORD-001',
  status: OrderStatus.PROCESSING,
  total: 120.0,
  currency: 'USD',
  shippingMethod: 'Standard',
  customer: {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
  },
  createdAt: '2024-06-01T10:00:00Z',
};

export const Default: Story = {
  args: {
    order: mockOrder,
  },
};

export const Processing: Story = {
  args: {
    order: {
      ...mockOrder,
      status: OrderStatus.PROCESSING,
    },
  },
};

export const Confirmed: Story = {
  args: {
    order: {
      ...mockOrder,
      status: OrderStatus.CONFIRMED,
      orderNumber: 'ORD-002',
    },
  },
};

export const Shipped: Story = {
  args: {
    order: {
      ...mockOrder,
      status: OrderStatus.SHIPPED,
      orderNumber: 'ORD-003',
      shippingMethod: 'Express',
    },
  },
};

export const Completed: Story = {
  args: {
    order: {
      ...mockOrder,
      status: OrderStatus.COMPLETED,
      orderNumber: 'ORD-004',
      total: 200.0,
    },
  },
};

export const Cancelled: Story = {
  args: {
    order: {
      ...mockOrder,
      status: OrderStatus.CANCELLED,
      orderNumber: 'ORD-005',
      total: 95.0,
    },
  },
};

export const HighValue: Story = {
  args: {
    order: {
      ...mockOrder,
      orderNumber: 'ORD-999',
      total: 9999.99,
      currency: 'EUR',
      shippingMethod: 'Priority Express',
    },
  },
};

export const NoShippingMethod: Story = {
  args: {
    order: {
      ...mockOrder,
      shippingMethod: undefined,
    },
  },
};
