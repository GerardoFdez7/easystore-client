import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ResetPasswordFields from '@atoms/authentication/login/ResetPasswordFields';
import { Form } from '@shadcn/ui/form';
import { Button } from '@shadcn/ui/button';

// Mock form schema
const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Wrapper component to provide form context
function FormWrapper({
  withValidation = true,
  showSubmitButton = true,
}: {
  withValidation?: boolean;
  showSubmitButton?: boolean;
}) {
  const form = useForm<ResetPasswordFormData>({
    resolver: withValidation ? zodResolver(resetPasswordSchema) : undefined,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Reset Password</h2>
      <Form {...form}>
        <form
          onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
          className="space-y-4"
        >
          <ResetPasswordFields />
          {showSubmitButton && (
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByLabelText('Password'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByLabelText('Confirm Password'),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Authentication/Login/ResetPasswordFields',
  component: FormWrapper,
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
} satisfies Meta<typeof FormWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    withValidation: true,
    showSubmitButton: true,
  },
  play: async ({ canvas }) => {
    const password = canvas.getByLabelText('Password');
    await storybookExpect(password).toHaveAttribute('type', 'password');
    await userEvent.type(password, 'secret123');
    const [toggle] = canvas.getAllByRole('button', { name: 'Show password' });
    await storybookExpect(toggle).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(toggle);
    await storybookExpect(password).toHaveAttribute('type', 'text');
    await storybookExpect(password).toHaveValue('secret123');
    await storybookExpect(
      canvas.getByRole('button', { name: 'Hide password' }),
    ).toHaveAttribute('aria-pressed', 'true');
  },
};

export const WithoutValidation: Story = {
  args: {
    withValidation: false,
    showSubmitButton: true,
  },
};

export const FieldsOnly: Story = {
  args: {
    withValidation: true,
    showSubmitButton: false,
  },
};

export const WithErrors: Story = {
  args: {
    withValidation: true,
    showSubmitButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Reset Password' }),
    );
    await storybookExpect(
      await canvas.findByText('Password must be at least 8 characters'),
    ).toBeInTheDocument();
  },
};
