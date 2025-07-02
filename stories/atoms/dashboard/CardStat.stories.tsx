import CardStat from '@atoms/dashboard/CardStat';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUpRight } from 'lucide-react';

const meta: Meta<typeof CardStat> = {
  title: 'Atoms/Dashboard/CardStat',
  component: CardStat,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    description: { control: 'text' },
    amount: { control: 'text' },
    trend: { control: 'text' },
    icon: { control: false },
    footerText: { control: 'text' },
    footerSubtext: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof CardStat>;

export const Default: Story = {
  args: {
    description: 'Sales',
    amount: '$1,200',
    trend: '+5%',
    icon: <ArrowUpRight className="size-4" />,
    footerText: 'Better than last month',
    footerSubtext: 'Updated 1 hour ago',
  },
};
