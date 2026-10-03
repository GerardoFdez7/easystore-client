import { expect as storybookExpect, within } from 'storybook/test';
import { ChartTotalSales } from '@molecules/dashboard/ChartTotalSales';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ChartTotalSales> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByText(/Total Sales|Sales/),
    ).toBeInTheDocument();
  },
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
