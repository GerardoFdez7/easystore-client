import { expect, within } from 'storybook/test';
import SalesOverview from '@molecules/dashboard/SalesOverview';
import type { RecentOrder } from '@hooks/domains/dashboard';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof SalesOverview> = {
  title: 'Molecules/Dashboard/SalesOverview',
  component: SalesOverview,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SalesOverview>;

const recentOrders = [
  {
    orderId: 'order-1',
    orderNumber: 'ES-1001',
    orderDate: '2026-10-07T12:00:00.000Z',
    customerName: 'Alicia Rivera',
    orderTotal: { amount: '125.50', currency: 'USD' },
    orderStatus: 'PROCESSING',
    shippingCity: 'Guatemala City',
  },
  {
    orderId: 'order-2',
    orderNumber: 'ES-1002',
    orderDate: '2026-10-06T12:00:00.000Z',
    customerName: 'Bruno Castillo',
    orderTotal: { amount: '80', currency: 'USD' },
    orderStatus: 'CONFIRMED',
    shippingCity: 'Guatemala City',
  },
  {
    orderId: 'order-3',
    orderNumber: 'ES-1003',
    orderDate: '2026-10-05T12:00:00.000Z',
    customerName: 'Carla Soto',
    orderTotal: { amount: '150', currency: 'USD' },
    orderStatus: 'SHIPPED',
    shippingCity: 'Guatemala City',
  },
  {
    orderId: 'order-4',
    orderNumber: 'ES-1004',
    orderDate: '2026-10-04T12:00:00.000Z',
    customerName: 'Diego Morales',
    orderTotal: { amount: '200', currency: 'USD' },
    orderStatus: 'COMPLETED',
    shippingCity: 'Guatemala City',
  },
  {
    orderId: 'order-5',
    orderNumber: 'ES-1005',
    orderDate: '2026-10-03T12:00:00.000Z',
    customerName: 'Elena Pérez',
    orderTotal: { amount: '95', currency: 'USD' },
    orderStatus: 'CANCELLED',
    shippingCity: 'Guatemala City',
  },
] satisfies RecentOrder[];

export const Default: Story = {
  args: {
    locale: 'en',
    recentOrders,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('ES-1001')).toBeInTheDocument();
    await expect(canvas.getByText(/125.50/)).toBeInTheDocument();
    await expect(canvas.getAllByRole('row')).toHaveLength(6);
  },
};

export const Empty: Story = {
  args: { locale: 'en', recentOrders: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No recent orders')).toBeInTheDocument();
  },
};
