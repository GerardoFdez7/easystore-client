import { ChartTotalSales } from '@molecules/dashboard/ChartTotalSales';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ChartTotalSales> = {
  title: 'Molecules/Dashboard/ChartTotalSales',
  component: ChartTotalSales,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ChartTotalSales>;

export const Default: Story = {};
