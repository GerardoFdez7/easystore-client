import type { Meta, StoryObj } from '@storybook/nextjs';
import ForgotPassword from '@atoms/authentication/login/ForgotPassword';

const meta = {
  title: 'Atoms/Authentication/Login/ForgotPassword',
  component: ForgotPassword,
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
} satisfies Meta<typeof ForgotPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InForm: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen p-4">
        <div className="mx-auto max-w-md rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Login Form</h2>
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
            <div className="text-center">
              <Story />
            </div>
            <button className="w-full rounded bg-blue-600 p-2 text-white">
              Login
            </button>
          </div>
        </div>
      </div>
    ),
  ],
};
