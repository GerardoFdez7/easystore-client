import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SettingsTemplate from '@templates/Settings';
import { withCountdown } from './mocks/withCountdown';

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Settings' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Settings',
  component: SettingsTemplate,
  args: {
    children: <p>Profile settings content</p>,
  },
  decorators: [withCountdown],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/en/settings/profile',
      },
    },
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

export const Profile: Story = {
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('link', { name: 'Profile' }),
    ).toHaveAttribute('aria-current', 'page');
  },
};
