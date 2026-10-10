import { expect, userEvent, within } from 'storybook/test';
import { ChartTotalSales } from '@molecules/dashboard/ChartTotalSales';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const timeline = [
  ['2026-07-15', '85.25'],
  ['2026-08-01', '240.10'],
  ['2026-08-15', '125.50'],
  ['2026-09-01', '310.05'],
  ['2026-09-15', '205.75'],
  ['2026-09-25', '390.20'],
  ['2026-10-05', '160.30'],
  ['2026-10-09', '475.15'],
].map(([date, amount]) => ({
  date,
  ordersCount: 1,
  revenue: { amount, currency: 'USD' },
}));

const meta: Meta<typeof ChartTotalSales> = {
  title: 'Molecules/Dashboard/ChartTotalSales',
  component: ChartTotalSales,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="w-full min-w-75">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartTotalSales>;

export const Default: Story = {
  args: {
    locale: 'en',
    today: '2026-10-09',
    totalRevenue: { amount: '1992.30', currency: 'USD' },
    ordersTimeline: timeline,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Total Sales' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('img', { name: 'Sales over time' }),
    ).toBeInTheDocument();
    await expect(canvas.getByText('$1,992.30')).toBeInTheDocument();
  },
};

export const SevenDays: Story = {
  args: {
    locale: 'en',
    today: '2026-10-09',
    totalRevenue: { amount: '1992.30', currency: 'USD' },
    ordersTimeline: timeline,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Last 7 days' }));
    await expect(
      canvas.getByRole('radio', { name: 'Last 7 days' }),
    ).toHaveAttribute('data-state', 'on');
    await expect(canvas.getByText('$635.45')).toBeInTheDocument();
    await expect(canvas.queryByText(/Jul 15/)).not.toBeInTheDocument();
    await expect(canvas.findByText(/Oct 9/)).resolves.toBeInTheDocument();
  },
};

export const OnePoint: Story = {
  args: {
    locale: 'es',
    today: '2026-10-09',
    totalRevenue: { amount: '1754.99', currency: 'GTQ' },
    ordersTimeline: [
      {
        date: '2026-10-09',
        ordersCount: 1,
        revenue: { amount: '1754.99', currency: 'GTQ' },
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('img', { name: 'Sales over time' }),
    ).toBeInTheDocument();
    await expect(
      canvasElement.querySelector('.recharts-dot'),
    ).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    locale: 'en',
    totalRevenue: { amount: '0', currency: 'USD' },
    ordersTimeline: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No Orders Yet')).toBeInTheDocument();
    await expect(
      canvas.queryByRole('img', { name: 'Sales over time' }),
    ).not.toBeInTheDocument();
  },
};

export const LastOrderOlderThanRange: Story = {
  args: {
    locale: 'en',
    today: '2026-12-01',
    totalRevenue: { amount: '1992.30', currency: 'USD' },
    ordersTimeline: timeline,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'Last 7 days' }));
    await expect(canvas.getByText('No Orders Yet')).toBeInTheDocument();
    await expect(
      canvas.queryByRole('img', { name: 'Sales over time' }),
    ).not.toBeInTheDocument();
  },
};
