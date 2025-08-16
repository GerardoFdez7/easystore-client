import type { Meta, StoryObj } from '@storybook/react';
import LinkToLogin from '@atoms/register/LinkToLogin';

const meta: Meta<typeof LinkToLogin> = {
  title: 'Atoms/Register/LinkToLogin',
  component: LinkToLogin,
};

export default meta;

type Story = StoryObj<typeof LinkToLogin>;

export const Default: Story = {};
