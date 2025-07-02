import MainDashboard from '@organisms/dashboard/MainDashboard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainDashboard> = {
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
