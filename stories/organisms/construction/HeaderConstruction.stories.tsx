import type { Meta, StoryObj } from '@storybook/nextjs';
import HeaderConstruction from '@organisms/construction/HeaderConstruction';

const meta: Meta<typeof HeaderConstruction> = {
  title: 'Organisms/Construction/HeaderConstruction',
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  component: HeaderConstruction,
};

export default meta;

type Story = StoryObj<typeof HeaderConstruction>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="mb-12 flex flex-1 flex-col items-center justify-center space-y-12 text-center">
        <Story />
      </div>
    ),
  ],
};
