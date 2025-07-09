import WelcomeDashboard from '@atoms/dashboard/WelcomeDashboard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof WelcomeDashboard> = {
  title: 'Atoms/Dashboard/WelcomeDashboard',
  component: WelcomeDashboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof WelcomeDashboard>;

export const Default: Story = {};
