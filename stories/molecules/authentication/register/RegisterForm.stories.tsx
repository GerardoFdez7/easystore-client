import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import RegisterForm from '@molecules/authentication/register/RegisterForm';
import { AccountTypeEnum } from '@graphql/generated';

const messages = {
  Register: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    buttonRegister: 'Create account',
  },
};

const meta: Meta<typeof RegisterForm> = {
  title: 'Molecules/Authentication/Register/RegisterForm',
  component: RegisterForm,
  args: { accountType: AccountTypeEnum.Tenant },
};
export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  render: (args) => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <div className="max-w-md">
        <RegisterForm {...args} />
      </div>
    </NextIntlClientProvider>
  ),
};
