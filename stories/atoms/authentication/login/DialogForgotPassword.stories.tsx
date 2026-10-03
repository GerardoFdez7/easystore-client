import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryContext, StoryObj } from '@storybook/nextjs-vite';
import DialogForgotPassword from '@atoms/authentication/login/DialogForgotPassword';
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
      <button className="text-primary hover:text-primary underline">
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
  title: 'Atoms/Authentication/Login/DialogForgotPassword',
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

// The dialog renders in a portal outside the canvas, so query through `screen`.
const openDialogFrom =
  (triggerName: string) =>
  async ({ canvas }: Pick<StoryContext, 'canvas'>) => {
    const trigger = canvas.getByRole('button', { name: triggerName });
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog');
    const heading = await screen.findByRole('heading', {
      name: 'Forgot Password',
    });
    // The dialog fades in, so wait for the animation to finish.
    await waitFor(() => storybookExpect(heading).toBeVisible());
    await storybookExpect(dialog).toContainElement(
      screen.getByLabelText('Email'),
    );
    await storybookExpect(
      screen.getByRole('button', { name: 'Send' }),
    ).toBeEnabled();
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'true');
  };

export const Default: Story = {
  play: async (context) => {
    await openDialogFrom('Forgot Password?')(context);
    await storybookExpect(screen.getByRole('dialog')).toBeVisible();
  },
};

export const WithLinkTrigger: Story = {
  render: () => <LinkTrigger />,
  play: async (context) => {
    await openDialogFrom('Forgot your password?')(context);
    await storybookExpect(screen.getByRole('dialog')).toBeVisible();
  },
};

export const WithCustomButton: Story = {
  render: () => <CustomButtonTrigger />,
  play: async (context) => {
    await openDialogFrom('Need help?')(context);
    await storybookExpect(screen.getByRole('dialog')).toBeVisible();
  },
};

export const WithPrimaryButton: Story = {
  render: () => <PrimaryButtonTrigger />,
  play: async (context) => {
    await openDialogFrom('Reset Password')(context);
    await storybookExpect(screen.getByRole('dialog')).toBeVisible();
  },
};

export const WithSecondaryButton: Story = {
  render: () => <SecondaryButtonTrigger />,
  play: async (context) => {
    await openDialogFrom("Can't sign in?")(context);
    await storybookExpect(screen.getByRole('dialog')).toBeVisible();
  },
};
