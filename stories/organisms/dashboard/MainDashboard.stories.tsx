import { expect as storybookExpect, within } from 'storybook/test';
import MainDashboard from '@organisms/dashboard/MainDashboard';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof MainDashboard> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Dashboard/MainDashboard',
  component: MainDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MainDashboard>;

export const Default: Story = {};
