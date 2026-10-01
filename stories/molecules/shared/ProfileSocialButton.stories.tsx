import ProfileSocialButton from '@molecules/shared/ProfileSocialButton';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof ProfileSocialButton> = {
  title: 'Molecules/Shared/ProfileSocialButton',
  component: ProfileSocialButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileSocialButton>;

export const Default: Story = {};
