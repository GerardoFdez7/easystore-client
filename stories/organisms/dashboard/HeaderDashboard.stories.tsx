import type { Meta, StoryObj } from '@storybook/nextjs';
import HeaderDashboard from '@organisms/dashboard/HeaderDashboard';

const meta: Meta<typeof HeaderDashboard> = {
  title: 'Organisms/Dashboard/HeaderDashboard',
  component: HeaderDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HeaderDashboard>;

export const Deafult: Story = {};
