import { expect as storybookExpect, within } from 'storybook/test';
import WelcomeDashboard from '@atoms/dashboard/WelcomeDashboard';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof WelcomeDashboard> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('heading')).toBeInTheDocument();
  },
  title: 'Atoms/Dashboard/WelcomeDashboard',
  component: WelcomeDashboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof WelcomeDashboard>;

export const AuthenticatedOwner: Story = {};
