import type { Meta, StoryObj } from '@storybook/nextjs';
import ProfileSection from '@atoms/profile/ProfileSection';

const meta: Meta<typeof ProfileSection> = {
  component: ProfileSection,
  title: 'Atoms/Profile/ProfileSection',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the section',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    buttonText: {
      control: 'text',
      description: 'Text displayed on the button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onButtonClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileSection>;

export const Default: Story = {
  args: {
    title: 'Plan',
    description: 'Current plan: Basic',
    buttonText: 'Change Plan',
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Password',
    buttonText: 'Change Password',
  },
};

export const CustomStyling: Story = {
  args: {
    title: 'Settings',
    description: 'Manage your account settings',
    buttonText: 'Update Settings',
    className: 'mb-6',
  },
};
