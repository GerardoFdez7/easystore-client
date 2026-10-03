import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LinkToLogin from '@atoms/authentication/register/LinkToLogin';

const meta: Meta<typeof LinkToLogin> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('link')).toBeInTheDocument();
  },
  title: 'Atoms/Authentication/Register/LinkToLogin',
  parameters: {
    layout: 'centered',
  },
  component: LinkToLogin,
};

export default meta;

type Story = StoryObj<typeof LinkToLogin>;

export const Default: Story = {};
