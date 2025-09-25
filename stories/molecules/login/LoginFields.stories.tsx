import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LoginFields from '@molecules/login/LoginFields';
import { Form } from '@shadcn/ui/form';
import { Button } from '@shadcn/ui/button';

// Mock form schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Wrapper component to provide form context
function FormWrapper({
  withValidation = true,
  showSubmitButton = true,
  defaultValues = { email: '', password: '' },
}: {
  withValidation?: boolean;
  showSubmitButton?: boolean;
  defaultValues?: { email: string; password: string };
}) {
  const form = useForm<LoginFormData>({
    resolver: withValidation ? zodResolver(loginSchema) : undefined,
    defaultValues,
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login form submitted:', data);
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Login</h2>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >
          <LoginFields />
          {showSubmitButton && (
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

const meta = {
  title: 'Molecules/Login/LoginFields',
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

export const WithPrefilledData: Story = {
  args: {
    withValidation: true,
    showSubmitButton: true,
    defaultValues: {
      email: 'user@example.com',
      password: 'password123',
    },
  },
};

export const WithErrors: Story = {
  args: {
    withValidation: true,
    showSubmitButton: true,
  },
  play: async ({ canvasElement }) => {
    // This would trigger validation error by submitting empty form
    const submitButton = canvasElement.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    if (submitButton) {
      submitButton.click();
    }
  },
};
