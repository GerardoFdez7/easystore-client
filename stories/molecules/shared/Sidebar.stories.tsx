import { SiderbarDashboard } from '@molecules/shared/Sidebar';
import { SidebarProvider } from '@shadcn/ui/sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof SiderbarDashboard> = {
  title: 'Molecules/Shared/Sidebar',
  component: SiderbarDashboard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SiderbarDashboard>;

export const Default: Story = {};
