import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DialogResetPassword from '@molecules/authentication/login/DialogResetPassword';
import { ResetPasswordFormData } from '@molecules/authentication/login/ResetPasswordForm';

// Mock form schema
const mockSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Wrapper component for stories
function DialogWrapper({
  isOpen = true,
  hasToken = true,
  loading = false,
  isTokenInvalid = false,
  onSubmit,
}: {
  isOpen?: boolean;
  hasToken?: boolean;
  loading?: boolean;
  isTokenInvalid?: boolean;
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
}) {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(mockSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div>
      <DialogResetPassword
        isOpen={isOpen}
        onClose={fn()}
        onSuccess={fn()}
        token={hasToken ? 'mock-reset-token' : ''}
        form={form}
        onSubmit={onSubmit}
        loading={loading}
        isTokenInvalid={isTokenInvalid}
      />
    </div>
  );
}

const meta = {
  title: 'Molecules/Authentication/Login/DialogResetPassword',
  component: DialogWrapper,
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
} satisfies Meta<typeof DialogWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    hasToken: true,
    loading: false,
    onSubmit: fn(async () => undefined),
  },
  play: async ({ args }) => {
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toHaveTextContent('Reset Password');
    const inputs = dialog.querySelectorAll('input[type="password"]');
    await userEvent.type(inputs[0] as HTMLElement, 'NewSecret123');
    await userEvent.type(inputs[1] as HTMLElement, 'NewSecret123');
    await userEvent.click(
      screen.getByRole('button', { name: 'Update Password' }),
    );
    await waitFor(() =>
      storybookExpect(args.onSubmit).toHaveBeenCalledWith(
        { password: 'NewSecret123', confirmPassword: 'NewSecret123' },
        storybookExpect.anything(),
      ),
    );
  },
};

export const WithInvalidToken: Story = {
  args: {
    isOpen: true,
    hasToken: true,
    loading: false,
    isTokenInvalid: true,
    onSubmit: fn(),
  },
  play: async () => {
    await storybookExpect(
      await screen.findByText(
        'This reset link has expired. Please request a new one.',
      ),
    ).toBeInTheDocument();
    await storybookExpect(
      screen.queryByRole('button', { name: 'Update Password' }),
    ).not.toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: {
    isOpen: true,
    hasToken: true,
    loading: true,
    onSubmit: fn(),
  },
  play: async () => {
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toHaveTextContent('Reset Password');
    const submit = dialog.querySelector('button[type="submit"]');
    await storybookExpect(submit).toBeDisabled();
    await storybookExpect(
      screen.queryByRole('button', { name: 'Update Password' }),
    ).not.toBeInTheDocument();
  },
};
