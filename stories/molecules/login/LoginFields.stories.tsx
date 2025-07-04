import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { IntlProvider } from 'next-intl';
import { LoginFields } from '@molecules/login/LoginFields';

const meta: Meta<typeof LoginFields> = {
  title: 'Molecules/Login/LoginFields',
  component: LoginFields,
};

export default meta;

type Story = StoryObj<typeof LoginFields>;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <IntlProvider
      messages={{ Login: { email: 'Email', password: 'Password' } }}
      locale="en"
    >
      <FormProvider {...form}>{children}</FormProvider>
    </IntlProvider>
  );
};

export const Default: Story = {
  render: () => (
    <Wrapper>
      <LoginFields />
    </Wrapper>
  ),
};
