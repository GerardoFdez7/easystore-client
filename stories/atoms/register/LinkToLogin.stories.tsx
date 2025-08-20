import type { Meta, StoryObj } from '@storybook/nextjs';
import LinkToLogin from '@atoms/register/LinkToLogin';

const meta: Meta<typeof LinkToLogin> = {
  title: 'Atoms/Register/LinkToLogin',
  parameters: {
    layout: 'centered',
  },
  component: LinkToLogin,
};

export default meta;

type Story = StoryObj<typeof LinkToLogin>;

export const Default: Story = {};
