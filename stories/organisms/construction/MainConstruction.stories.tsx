import type { Meta, StoryObj } from '@storybook/nextjs';
import MainConstruction from '@organisms/construction/MainConstruction';

const meta: Meta<typeof MainConstruction> = {
  title: 'Organisms/Construction/MainConstruction',
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  component: MainConstruction,
};

export default meta;

type Story = StoryObj<typeof MainConstruction>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl space-y-12 p-8">
        <Story />
      </div>
    ),
  ],
};

export const FullPage: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="from-background via-card to-background flex min-h-screen items-center justify-center bg-gradient-to-br p-8">
        <div className="w-full max-w-4xl space-y-12">
          <Story />
        </div>
      </div>
    ),
  ],
};
