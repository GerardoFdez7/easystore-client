import type { Meta, StoryObj } from '@storybook/react';
import MainProfile from '@organisms/profile/MainProfile';

const meta: Meta<typeof MainProfile> = {
  component: MainProfile,
  title: 'Organisms/Profile/MainProfile',
};

export default meta;

type Story = StoryObj<typeof MainProfile>;

export const Default: Story = {};
