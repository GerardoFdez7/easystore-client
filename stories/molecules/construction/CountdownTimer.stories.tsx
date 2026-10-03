import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CountdownTimer from '@molecules/construction/CountdownTimer';
import { CountdownProvider } from '@contexts/CountdownContext';

const meta: Meta<typeof CountdownTimer> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Launching In' }),
    ).toBeInTheDocument();
    for (const label of ['Days', 'Hours', 'Minutes', 'Seconds']) {
      await storybookExpect(canvas.getByText(label)).toBeInTheDocument();
    }
  },
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
      <CountdownProvider>
        <div className="min-h-100 w-full max-w-2xl p-8">
          <Story />
        </div>
      </CountdownProvider>
    ),
  ],
};
