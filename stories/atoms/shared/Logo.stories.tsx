import type { Meta, StoryObj } from '@storybook/react';
import Logo from '@atoms/shared/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Shared/Logo',
  component: Logo,
  args: { redirectTo: '/' },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
