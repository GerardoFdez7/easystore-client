import { expect as storybookExpect } from 'storybook/test';
import ButtonSidebar from '@atoms/dashboard/ButtonSidebar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Dashboard' }),
    ).toHaveAttribute('data-active', 'true');
  },
};

export const Outline: Story = {
  args: {
    icon: <Home aria-hidden="true" />,
    label: 'Store overview',
    route: '/overview',
    variant: 'outline',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Store overview' });
    await storybookExpect(button).toHaveAttribute('data-active', 'false');
    await storybookExpect(button).toHaveAttribute('data-size', 'default');
  },
};
