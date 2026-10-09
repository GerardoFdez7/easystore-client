import { expect, within } from 'storybook/test';
import { KPICards } from '@molecules/dashboard/KPICards';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof KPICards> = {
  title: 'Molecules/Dashboard/KPICards',
  component: KPICards,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof KPICards>;

export const Default: Story = {
  args: {
    locale: 'en',
    summary: {
      totalOrders: 128,
      totalRevenue: { amount: '12345.67', currency: 'USD' },
      averageOrderValue: { amount: '96.45', currency: 'USD' },
      uniqueCustomers: 74,
      completedOrders: 98,
      cancelledOrders: 4,
      processingOrders: 12,
      confirmedOrders: 8,
      shippedOrders: 6,
      completedRevenue: { amount: '10345.67', currency: 'USD' },
      cancelledRevenue: { amount: '100.00', currency: 'USD' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/12,345.67/)).toBeInTheDocument();
    await expect(canvas.getByText('74')).toBeInTheDocument();
  },
};
