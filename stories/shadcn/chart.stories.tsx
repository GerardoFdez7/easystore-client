import { ChartContainer } from '@shadcn/ui/chart';
import type { Meta, StoryObj } from '@storybook/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
];

const chartConfig = {
  value: {
    label: 'Sales',
    color: '#6366f1',
  },
};

const meta: Meta<typeof ChartContainer> = {
  title: 'Shadcn/Chart',
  component: ChartContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    config: chartConfig,
    children: (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="var(--color-value)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500, height: 350 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {};
