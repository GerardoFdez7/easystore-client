import ButtonSidebar from '@atoms/dashboard/ButtonSidebar';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Home } from 'lucide-react';

const meta: Meta<typeof ButtonSidebar> = {
  title: 'Atoms/Dashboard/ButtonSidebar',
  component: ButtonSidebar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: { control: false },
    route: { control: 'text' },
    label: { control: 'text' },
    variant: {
      control: 'radio',
      options: ['default', 'ghost'],
    },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ButtonSidebar>;
export const Default: Story = {
  args: {
    icon: <Home />,
    label: 'Dashboard',
    route: 'dashboard',
    variant: 'outline',
  },
};
