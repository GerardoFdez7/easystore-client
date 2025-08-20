import type { Meta, StoryObj } from '@storybook/nextjs';
import { Zap, DollarSign, Users, Rocket, Heart, Star } from 'lucide-react';
import FeatureIcon from '@atoms/construction/FeatureIcon';

const meta: Meta<typeof FeatureIcon> = {
  title: 'Atoms/Construction/FeatureIcon',
  parameters: {
    layout: 'centered',
  },
  component: FeatureIcon,
  argTypes: {
    icon: {
      control: false,
      description: 'Lucide icon component to display',
    },
    label: {
      control: 'text',
      description: 'Text label displayed below the icon',
    },
    iconColor: {
      control: 'text',
      description: 'Tailwind CSS class for icon color',
    },
  },
  args: {
    icon: Zap,
    label: 'Lightning Fast',
    iconColor: 'text-title',
  },
};

export default meta;

type Story = StoryObj<typeof FeatureIcon>;

export const Default: Story = {};

export const WithSecondaryColor: Story = {
  args: {
    icon: DollarSign,
    label: 'Low Cost',
    iconColor: 'text-secondary',
  },
};

export const UserFriendly: Story = {
  args: {
    icon: Users,
    label: 'User Friendly',
  },
};

export const QuickLaunch: Story = {
  args: {
    icon: Rocket,
    label: 'Quick Launch',
    iconColor: 'text-secondary',
  },
};

export const CustomIcon: Story = {
  args: {
    icon: Heart,
    label: 'Made with Love',
    iconColor: 'text-red-500',
  },
};

export const StarIcon: Story = {
  args: {
    icon: Star,
    label: 'Premium Quality',
    iconColor: 'text-yellow-500',
  },
};
