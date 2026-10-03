import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AuthenticationHeader from '@molecules/authentication/shared/AuthenticationHeader';

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('heading')).toBeInTheDocument();
  },
  title: 'Molecules/Authentication/Shared/AuthenticationHeader',
  component: AuthenticationHeader,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { description: 'Primary authentication heading.' },
    description: { description: 'Supporting authentication guidance.' },
    descriptionClassName: { control: false },
  },
} satisfies Meta<typeof AuthenticationHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome back',
    description: 'Log in to continue managing your store.',
  },
};

export const ConstrainedDescription: Story = {
  args: {
    title: 'Create your EasyStore account',
    description: "Start selling in minutes — it's free to get started.",
    descriptionClassName: 'max-w-md text-center sm:text-left',
  },
};
