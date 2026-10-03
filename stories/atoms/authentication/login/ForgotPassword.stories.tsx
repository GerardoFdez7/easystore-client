import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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

// The dialog renders in a portal outside the canvas, so query through `screen`.
const openForgotPasswordDialog: Story['play'] = async ({ canvas }) => {
  const trigger = canvas.getByRole('button', { name: 'Forgot password?' });
  await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'false');
  await userEvent.click(trigger);
  const heading = await screen.findByRole('heading', {
    name: 'Forgot Password',
  });
  // The dialog fades in, so wait for the animation to finish.
  await waitFor(() => storybookExpect(heading).toBeVisible());
  await storybookExpect(screen.getByRole('dialog')).toBeVisible();
  await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'true');
};

export const Default: Story = {
  play: openForgotPasswordDialog,
};

export const InForm: Story = {
  play: openForgotPasswordDialog,
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
            <button className="bg-primary text-primary-foreground w-full rounded p-2">
              Login
            </button>
          </div>
        </div>
      </div>
    ),
  ],
};
