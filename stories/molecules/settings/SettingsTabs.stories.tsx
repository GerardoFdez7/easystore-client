import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SettingsTabs from '@molecules/settings/SettingsTabs';

const meta = {
  title: 'Molecules/Settings/SettingsTabs',
  component: SettingsTabs,
  parameters: {
    layout: 'centered',
    nextjs: {
      navigation: {
        pathname: '/en/settings/profile',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingsTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Profile: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.getByRole('navigation', { name: 'Settings' });
    const profile = within(navigation).getByRole('link', { name: 'Profile' });

    await storybookExpect(profile).toHaveAttribute(
      'href',
      '/en/settings/profile',
    );
    await storybookExpect(profile).toHaveAttribute('aria-current', 'page');
  },
};
