import type { Meta, StoryObj } from '@storybook/nextjs';
import UnderConstructionTemplate from '@templates/UnderConstruction';
import { withCountdown } from './mocks/withCountdown';

const meta: Meta<typeof UnderConstructionTemplate> = {
  title: 'Templates/UnderConstructionTemplate',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  component: UnderConstructionTemplate,
  decorators: [withCountdown],
  tags: ['autodocs'],
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
