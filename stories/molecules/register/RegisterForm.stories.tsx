import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IntlProvider } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterForm } from '@molecules/register/RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  title: 'Molecules/Register/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof RegisterForm>;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <IntlProvider
      locale="en"
      messages={{
        Register: {
          email: 'Email',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          buttonRegister: 'Register',
        },
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </IntlProvider>
  );
};

export const Default: Story = {
  render: () => (
    <Wrapper>
      <RegisterForm />
    </Wrapper>
  ),
};
