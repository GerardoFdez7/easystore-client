import type { Meta, StoryObj } from '@storybook/nextjs';
import LinkToLogin from '@atoms/authentication/register/LinkToLogin';

const meta: Meta<typeof LinkToLogin> = {
  title: 'Atoms/Authentication/Register/LinkToLogin',
  parameters: {
    layout: 'centered',
  },
  component: LinkToLogin,
};

export default meta;

type Story = StoryObj<typeof LinkToLogin>;

export const Default: Story = {};
