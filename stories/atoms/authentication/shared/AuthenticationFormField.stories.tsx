import { expect as storybookExpect, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';
import AuthenticationFormField, {
  type AuthenticationFormFieldProps,
} from '@atoms/authentication/shared/AuthenticationFormField';

type AuthenticationFormValues = {
  credential: string;
};

function AuthenticationFormFieldFixture(props: AuthenticationFormFieldProps) {
  const form = useForm<AuthenticationFormValues>({
    defaultValues: {
      credential: '',
    },
  });

  return (
    <FormProvider {...form}>
      <form className="w-96">
        <AuthenticationFormField {...props} />
      </form>
    </FormProvider>
  );
}

const meta = {
  title: 'Atoms/Authentication/Shared/AuthenticationFormField',
  component: AuthenticationFormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'credential',
    label: 'Email',
    type: 'email',
  },
  argTypes: {
    name: { description: 'React Hook Form field path.' },
    label: { description: 'Localized field label.' },
    type: { control: 'select', options: ['email', 'password', 'text'] },
    revealable: { control: 'boolean' },
  },
  render: (args) => <AuthenticationFormFieldFixture {...args} />,
} satisfies Meta<typeof AuthenticationFormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Email: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Email' });
    await userEvent.type(input, 'user@example.com');
    await storybookExpect(input).toHaveValue('user@example.com');
    await storybookExpect(input).toHaveAttribute('type', 'email');
  },
};

export const RevealablePassword: Story = {
  args: {
    label: 'Password',
    type: 'password',
    revealable: true,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Password');
    await storybookExpect(input).toHaveAttribute('type', 'password');
    await userEvent.type(input, 'secret123');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Show password' }),
    );
    await storybookExpect(input).toHaveAttribute('type', 'text');
    await storybookExpect(input).toHaveValue('secret123');
    await storybookExpect(
      canvas.getByRole('button', { name: 'Hide password' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await storybookExpect(canvas.getByLabelText('Password')).toBe(input);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Hide password' }),
    );
    await storybookExpect(input).toHaveAttribute('type', 'password');
    await storybookExpect(input).toHaveValue('secret123');
  },
};
