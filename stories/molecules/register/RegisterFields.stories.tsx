import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { IntlProvider } from 'next-intl';
import { RegisterFields } from '@molecules/register/RegisterFields';

const meta: Meta<typeof RegisterFields> = {
  title: 'Molecules/Register/RegisterFields',
  component: RegisterFields,
};

export default meta;

type Story = StoryObj<typeof RegisterFields>;

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
      <RegisterFields />
    </Wrapper>
  ),
};
