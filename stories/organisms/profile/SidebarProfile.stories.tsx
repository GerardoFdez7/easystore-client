import type { Meta, StoryObj } from '@storybook/nextjs';
import SidebarProfile from '@organisms/profile/SidebarProfile';

const meta: Meta<typeof SidebarProfile> = {
  component: SidebarProfile,
  title: 'Organisms/Profile/SidebarProfile',
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarProfile>;

export const Default: Story = {};
