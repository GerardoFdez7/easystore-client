import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Logo from '@atoms/shared/Logo';

const meta: Meta<typeof Logo> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('img')).toBeInTheDocument();
  },
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
