import ButtonSidebar from '@atoms/dashboard/ButtonSidebar';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { SidebarProvider } from '@shadcn/ui/sidebar';
import { Home } from 'lucide-react';

const meta: Meta<typeof ButtonSidebar> = {
  title: 'Atoms/Dashboard/ButtonSidebar',
  component: ButtonSidebar,
  parameters: {
    layout: 'centered',
    nextjs: {
      navigation: {
        pathname: '/en/dashboard',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SidebarProvider className="min-h-0 w-64">
        <Story />
      </SidebarProvider>
    ),
  ],
  argTypes: {
    icon: {
      control: false,
      description: 'Icon displayed before the navigation label.',
    },
    label: {
      control: 'text',
      description: 'Visible navigation label and tooltip content.',
    },
    route: {
      control: 'text',
      description: 'Locale-relative route used for navigation.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'outline'],
      description: 'Sidebar button visual variant.',
    },
    expandOnClick: {
      control: 'boolean',
      description: 'Attempts to expand the sidebar before navigating.',
    },
    onExpandClick: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonSidebar>;

export const Selected: Story = {
  args: {
    icon: <Home aria-hidden="true" />,
    label: 'Dashboard',
    route: '/dashboard',
  },
};

export const Outline: Story = {
  args: {
    icon: <Home aria-hidden="true" />,
    label: 'Store overview',
    route: '/overview',
    variant: 'outline',
  },
};
