import type { Meta, StoryObj } from '@storybook/nextjs';
import SettingsTemplate from '@templates/Settings';
import { withCountdown } from './mocks/withCountdown';

const meta = {
  title: 'Templates/Settings',
  component: SettingsTemplate,
  decorators: [withCountdown],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Settings workspace template with authenticated navigation and its current construction state.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingsTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UnderConstruction: Story = {};
