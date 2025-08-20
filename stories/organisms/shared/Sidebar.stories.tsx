import Sidebar from '@organisms/shared/Sidebar';
import { SidebarProvider } from '@shadcn/ui/sidebar';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Shared/Sidebar',
  component: Sidebar,
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

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
