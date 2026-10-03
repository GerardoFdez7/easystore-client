import { expect as storybookExpect, within } from 'storybook/test';
import CardStat from '@atoms/dashboard/CardStat';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowUpRight } from 'lucide-react';

const meta: Meta<typeof CardStat> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByText('Sales')).toBeInTheDocument();
  },
  title: 'Atoms/Dashboard/CardStat',
  component: CardStat,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
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
