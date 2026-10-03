import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
      control: false,
      description: 'Function called when button is clicked',
    },
  },
  args: {
    onButtonClick: fn(),
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
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Plan' }),
    ).toBeVisible();
    await storybookExpect(
      canvas.getByText('Current plan: Basic'),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Change Plan' }));
    await storybookExpect(args.onButtonClick).toHaveBeenCalledTimes(1);
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Password',
    buttonText: 'Change Password',
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Password' }),
    ).toBeVisible();
    await storybookExpect(canvas.getAllByRole('heading')).toHaveLength(1);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Change Password' }),
    );
    await storybookExpect(args.onButtonClick).toHaveBeenCalledTimes(1);
  },
};

export const CustomStyling: Story = {
  args: {
    title: 'Settings',
    description: 'Manage your account settings',
    buttonText: 'Update Settings',
    className: 'mb-6',
  },
  play: async ({ canvas, canvasElement }) => {
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Settings' }),
    ).toBeVisible();
    await storybookExpect(
      canvas.getByText('Manage your account settings'),
    ).toBeVisible();
    await storybookExpect(
      canvasElement.querySelector('.mb-6'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Update Settings' }),
    ).toBeEnabled();
  },
};
