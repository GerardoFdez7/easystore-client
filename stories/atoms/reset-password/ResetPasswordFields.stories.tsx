import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ResetPasswordFields from '@atoms/reset-password/ResetPasswordFields';

// Create a wrapper component to provide form context
function ResetPasswordFieldsWrapper() {
  const schema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <FormProvider {...form}>
      <div className="w-96 space-y-4">
        <ResetPasswordFields />
      </div>
    </FormProvider>
  );
}

const meta = {
  title: 'Atoms/ResetPassword/ResetPasswordFields',
  component: ResetPasswordFieldsWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // No props for this component as it uses form context
  },
} satisfies Meta<typeof ResetPasswordFieldsWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ResetPasswordFieldsWrapper />,
};

// Create a wrapper component for prefilled data
function ResetPasswordFieldsWithPrefilledData() {
  const schema = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: 'prefilledpassword',
      confirmPassword: 'prefilledpassword',
    },
  });

  return (
    <FormProvider {...form}>
      <div className="w-96 space-y-4">
        <ResetPasswordFields />
      </div>
    </FormProvider>
  );
}

export const WithPrefilledData: Story = {
  render: () => <ResetPasswordFieldsWithPrefilledData />,
};
