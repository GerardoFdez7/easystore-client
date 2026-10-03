import { expect as storybookExpect, within } from 'storybook/test';
import ProfileSocialButton from '@molecules/shared/ProfileSocialButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ProfileSocialButton> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: /Connect with Google/ }),
    ).toBeInTheDocument();
  },
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
