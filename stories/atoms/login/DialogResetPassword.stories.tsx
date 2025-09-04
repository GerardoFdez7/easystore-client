import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DialogResetPassword from '@atoms/login/DialogResetPassword';
import { ResetPasswordFormData } from '@molecules/login/ResetPasswordForm';

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
}: {
  isOpen?: boolean;
  hasToken?: boolean;
  loading?: boolean;
  isTokenInvalid?: boolean;
}) {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(mockSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: ResetPasswordFormData) => {
    console.log('Reset password data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div>
      <DialogResetPassword
        isOpen={isOpen}
        onClose={() => console.log('Dialog closed')}
        onSuccess={() => console.log('Password reset successful')}
        token={hasToken ? 'mock-reset-token' : ''}
        form={form}
        onSubmit={handleSubmit}
        loading={loading}
        isTokenInvalid={isTokenInvalid}
      />
    </div>
  );
}

const meta = {
  title: 'Atoms/Login/DialogResetPassword',
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
  },
};

export const WithInvalidToken: Story = {
  args: {
    isOpen: true,
    hasToken: true,
    loading: false,
    isTokenInvalid: true,
  },
};

export const Loading: Story = {
  args: {
    isOpen: true,
    hasToken: true,
    loading: true,
  },
};
