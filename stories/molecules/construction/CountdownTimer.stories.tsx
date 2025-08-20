import type { Meta, StoryObj } from '@storybook/nextjs';
import CountdownTimer from '@molecules/construction/CountdownTimer';

const meta: Meta<typeof CountdownTimer> = {
  title: 'Molecules/Construction/CountdownTimer',
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  component: CountdownTimer,
};

export default meta;

type Story = StoryObj<typeof CountdownTimer>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-[400px] w-full max-w-2xl p-8">
        <Story />
      </div>
    ),
  ],
};
