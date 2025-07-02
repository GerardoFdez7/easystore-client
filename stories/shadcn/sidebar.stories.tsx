import type { Meta, StoryObj } from '@storybook/react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@shadcn/ui/sidebar';
import { Home, Settings, User } from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Shadcn/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div style={{ minHeight: 400, background: '#f1f5f9', display: 'flex' }}>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-3 border-b px-4 py-6">
        <User className="text-primary h-7 w-7" />
        <div className="text-base font-semibold">Owner Name</div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-muted flex items-center gap-2 rounded px-4 py-2 transition">
              <Home className="h-5 w-5" />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-muted flex items-center gap-2 rounded px-4 py-2 transition">
              <Settings className="h-5 w-5" />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="text-muted-foreground border-t px-4 py-4 text-xs">
        &copy; 2025 EasyStore
      </SidebarFooter>
    </Sidebar>
  ),
};
