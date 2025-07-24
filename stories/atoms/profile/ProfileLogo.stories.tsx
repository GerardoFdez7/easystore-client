import type { Meta, StoryObj } from '@storybook/react';
import { ProfileLogo } from '@atoms/profile/ProfileLogo';

const meta: Meta<typeof ProfileLogo> = {
  component: ProfileLogo,
  title: 'Atoms/Profile/ProfileLogo',
};

export default meta;

type Story = StoryObj<typeof ProfileLogo>;

export const Default: Story = {};
