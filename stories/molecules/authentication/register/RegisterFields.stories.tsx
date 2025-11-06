import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import RegisterFields from '@molecules/authentication/register/RegisterFields';

const messages = {
  Register: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
  },
};

const meta: Meta<typeof RegisterFields> = {
  title: 'Molecules/Authentication/Register/RegisterFields',
  parameters: {
    layout: 'centered',
  },
  component: RegisterFields,
};
export default meta;

type Story = StoryObj<typeof RegisterFields>;

const RegisterFieldsStoryWrapper: React.FC = () => {
  const form = useForm({
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Form {...form}>
        <form className="max-w-md space-y-4">
          <RegisterFields />
        </form>
      </Form>
    </NextIntlClientProvider>
  );
};

export const Default: Story = {
  render: () => <RegisterFieldsStoryWrapper />,
};
