import type { Meta, StoryObj } from '@storybook/nextjs';
import Logo from '@atoms/shared/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Shared/Logo',
  parameters: {
    layout: 'centered',
  },
  component: Logo,
  args: { redirectTo: '/' },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
