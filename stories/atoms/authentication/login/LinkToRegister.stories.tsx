import type { Meta, StoryObj } from '@storybook/nextjs';
import LinkToRegister from '@atoms/authentication/login/LinkToRegister';

const meta = {
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
            <button className="w-full rounded bg-blue-600 p-2 text-white">
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
