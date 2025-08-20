import type { Meta, StoryObj } from '@storybook/nextjs';
import UnderConstructionTemplate from '@templates/UnderConstruction';

const meta: Meta<typeof UnderConstructionTemplate> = {
  title: 'Templates/UnderConstruction',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  component: UnderConstructionTemplate,
};

export default meta;

type Story = StoryObj<typeof UnderConstructionTemplate>;

export const Default: Story = {};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
