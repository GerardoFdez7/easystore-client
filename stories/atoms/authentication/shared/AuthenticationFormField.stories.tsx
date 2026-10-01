import type { Meta, StoryObj } from '@storybook/nextjs';
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

export const Email: Story = {};

export const RevealablePassword: Story = {
  args: {
    label: 'Password',
    type: 'password',
    revealable: true,
  },
};
