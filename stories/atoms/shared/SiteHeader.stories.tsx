import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarProvider } from '@shadcn/ui/sidebar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SiteHeader> = {
  title: 'Atoms/Shared/SiteHeader',
  component: SiteHeader,
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
  args: {
    title: 'Dashboard',
  },
};
export default meta;

type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {};
