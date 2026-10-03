import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DashboardPage from '@templates/Dashboard';

const meta: Meta<typeof DashboardPage> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Dashboard',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {};
