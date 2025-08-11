import type { Meta, StoryObj } from '@storybook/nextjs';
import DialogForgotPassword from '@atoms/login/DialogForgotPassword';
import { Button } from '@shadcn/ui/button';

// Wrapper components for different trigger types
function DefaultTrigger() {
  return (
    <DialogForgotPassword>
      <Button variant="outline">Forgot Password?</Button>
    </DialogForgotPassword>
  );
}

function LinkTrigger() {
  return (
    <DialogForgotPassword>
      <button className="text-blue-600 underline hover:text-blue-800">
        Forgot your password?
      </button>
    </DialogForgotPassword>
  );
}

function CustomButtonTrigger() {
  return (
    <DialogForgotPassword>
      <Button variant="ghost" size="sm">
        Need help?
      </Button>
    </DialogForgotPassword>
  );
}

function PrimaryButtonTrigger() {
  return (
    <DialogForgotPassword>
      <Button variant="default">Reset Password</Button>
    </DialogForgotPassword>
  );
}

function SecondaryButtonTrigger() {
  return (
    <DialogForgotPassword>
      <Button variant="secondary">Can&apos;t sign in?</Button>
    </DialogForgotPassword>
  );
}

const meta = {
  title: 'Atoms/Login/DialogForgotPassword',
  component: DefaultTrigger,
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
} satisfies Meta<typeof DefaultTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLinkTrigger: Story = {
  render: () => <LinkTrigger />,
};

export const WithCustomButton: Story = {
  render: () => <CustomButtonTrigger />,
};

export const WithPrimaryButton: Story = {
  render: () => <PrimaryButtonTrigger />,
};

export const WithSecondaryButton: Story = {
  render: () => <SecondaryButtonTrigger />,
};
