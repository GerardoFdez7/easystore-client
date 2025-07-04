import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HeaderRegister from '@organisms/register/HeaderRegister';
import { IntlProvider } from 'next-intl';

const meta: Meta<typeof HeaderRegister> = {
  title: 'Organisms/Register/HeaderRegister',
  component: HeaderRegister,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof HeaderRegister>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider
    locale="en"
    messages={{
      Register: {
        registerTitle: 'Create your account',
        registerMessage: 'Join our community by filling the form below.',
      },
    }}
  >
    {children}
  </IntlProvider>
);

export const Default: Story = {
  render: () => (
    <Wrapper>
      <HeaderRegister />
    </Wrapper>
  ),
};
