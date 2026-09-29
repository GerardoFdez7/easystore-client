import { ChartTotalSales } from '@molecules/dashboard/ChartTotalSales';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof ChartTotalSales> = {
  title: 'Molecules/Dashboard/ChartTotalSales',
  component: ChartTotalSales,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-screen max-w-225">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartTotalSales>;

export const Default: Story = {};
