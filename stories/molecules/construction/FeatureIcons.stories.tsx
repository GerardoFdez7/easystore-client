import type { Meta, StoryObj } from '@storybook/nextjs';
import FeatureIcons from '@molecules/construction/FeatureIcons';

const meta: Meta<typeof FeatureIcons> = {
  title: 'Molecules/Construction/FeatureIcons',
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      backgrounds: {
        default: 'dark',
        values: [
          { name: 'light', value: '#ffffff' },
          { name: 'dark', value: '#1a1a1a' },
        ],
      },
    },
  },
  component: FeatureIcons,
};

export default meta;

type Story = StoryObj<typeof FeatureIcons>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl p-8">
        <Story />
      </div>
    ),
  ],
};
