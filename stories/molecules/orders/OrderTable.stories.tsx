import { OrderTable } from '@molecules/orders/OrderTable';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Order, OrderStatus } from '@lib/types/order';

const meta: Meta<typeof OrderTable> = {
  title: 'Molecules/Orders/OrderTable',
  component: OrderTable,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orders: { control: 'object' },
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    totalRows: { control: 'number' },
    onPageChange: { action: 'pageChanged' },
    onPreviousPage: { action: 'previousPage' },
    onNextPage: { action: 'nextPage' },
    onFirstPage: { action: 'firstPage' },
    onLastPage: { action: 'lastPage' },
    canPreviousPage: { control: 'boolean' },
    canNextPage: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof OrderTable>;

const mockOrders: Order[] = [
  {
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
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    status: OrderStatus.CONFIRMED,
    total: 80.0,
    currency: 'USD',
    shippingMethod: 'Express',
    customer: {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    createdAt: '2024-06-02T11:30:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    status: OrderStatus.SHIPPED,
    total: 150.0,
    currency: 'USD',
    shippingMethod: 'Standard',
    customer: {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
    },
    createdAt: '2024-06-03T14:15:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    status: OrderStatus.COMPLETED,
    total: 200.0,
    currency: 'USD',
    shippingMethod: 'Express',
    customer: {
      id: '4',
      name: 'Diana Prince',
      email: 'diana@example.com',
    },
    createdAt: '2024-06-04T09:45:00Z',
  },
  {
    id: '5',
    orderNumber: 'ORD-005',
    status: OrderStatus.CANCELLED,
    total: 95.0,
    currency: 'USD',
    shippingMethod: 'Standard',
    customer: {
      id: '5',
      name: 'Eve Adams',
      email: 'eve@example.com',
    },
    createdAt: '2024-06-05T16:20:00Z',
  },
];

export const Default: Story = {
  args: {
    orders: mockOrders,
    currentPage: 1,
    totalPages: 3,
    totalRows: 50,
    canPreviousPage: false,
    canNextPage: true,
  },
};

export const Empty: Story = {
  args: {
    orders: [],
    currentPage: 1,
    totalPages: 1,
    totalRows: 0,
    canPreviousPage: false,
    canNextPage: false,
  },
};

export const SingleOrder: Story = {
  args: {
    orders: [mockOrders[0]],
    currentPage: 1,
    totalPages: 1,
    totalRows: 1,
    canPreviousPage: false,
    canNextPage: false,
  },
};

export const MiddlePage: Story = {
  args: {
    orders: mockOrders,
    currentPage: 5,
    totalPages: 10,
    totalRows: 250,
    canPreviousPage: true,
    canNextPage: true,
  },
};

export const LastPage: Story = {
  args: {
    orders: mockOrders.slice(0, 2),
    currentPage: 10,
    totalPages: 10,
    totalRows: 242,
    canPreviousPage: true,
    canNextPage: false,
  },
};

export const AllStatuses: Story = {
  args: {
    orders: mockOrders,
    currentPage: 1,
    totalPages: 1,
    totalRows: 5,
    canPreviousPage: false,
    canNextPage: false,
  },
};

export const DifferentCurrencies: Story = {
  args: {
    orders: [
      { ...mockOrders[0], currency: 'USD', total: 100.0 },
      { ...mockOrders[1], currency: 'EUR', total: 85.5 },
      { ...mockOrders[2], currency: 'GBP', total: 75.25 },
      { ...mockOrders[3], currency: 'JPY', total: 12500 },
      { ...mockOrders[4], currency: 'MXN', total: 2000.0 },
    ],
    currentPage: 1,
    totalPages: 1,
    totalRows: 5,
    canPreviousPage: false,
    canNextPage: false,
  },
};
