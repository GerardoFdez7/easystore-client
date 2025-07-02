import type { Meta, StoryObj } from '@storybook/react';
import DashboardPage from '@templates/Dashboard';

const meta: Meta<typeof DashboardPage> = {
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
