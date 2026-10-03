import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderLanding from '@organisms/landing/HeaderLanding';

const meta: Meta<typeof HeaderLanding> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', {
        name: 'Navigate to home or scroll to top',
      }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Landing/HeaderLanding',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },

  component: HeaderLanding,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeaderLanding>;

export const Default: Story = {};
