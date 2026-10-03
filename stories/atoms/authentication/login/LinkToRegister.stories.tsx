import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LinkToRegister from '@atoms/authentication/login/LinkToRegister';

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('link', { name: 'Register' }),
    ).toHaveAttribute('href', '/register');
  },
  title: 'Atoms/Authentication/Login/LinkToRegister',
  component: LinkToRegister,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkToRegister>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InLoginForm: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen p-4">
        <div className="mx-auto max-w-md rounded-lg border p-6">
          <h2 className="mb-4 text-center text-xl font-semibold">Login</h2>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded border p-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded border p-2"
            />
            <Story />
            <button className="bg-primary text-primary-foreground w-full rounded p-2">
              Login
            </button>
          </div>
        </div>
      </div>
    ),
  ],
};

export const Standalone: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <Story />
        </div>
      </div>
    ),
  ],
};
