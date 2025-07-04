import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IntlProvider } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginForm } from '@molecules/login/LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Molecules/Login/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <IntlProvider
      messages={{
        Login: {
          email: 'Email',
          password: 'Password',
          buttonLogin: 'Login',
        },
      }}
      locale="en"
    >
      <FormProvider {...form}>{children}</FormProvider>
    </IntlProvider>
  );
};

export const Default: Story = {
  render: () => (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  ),
};
