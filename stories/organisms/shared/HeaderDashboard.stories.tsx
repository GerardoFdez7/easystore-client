import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';

const meta: Meta<typeof HeaderDashboard> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('button', { name: 'Toggle theme' }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Shared/HeaderDashboard',
  component: HeaderDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HeaderDashboard>;

export const Default: Story = {};
