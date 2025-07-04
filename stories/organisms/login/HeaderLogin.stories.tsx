import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from '@organisms/login/HeaderLogin';
import { IntlProvider } from 'next-intl';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Login/HeaderLogin',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider
    locale="en"
    messages={{
      Login: {
        welcomeBack: 'Welcome back!',
        loginMessage: 'Please enter your credentials to continue.',
      },
    }}
  >
    {children}
  </IntlProvider>
);

export const Default: Story = {
  render: () => (
    <Wrapper>
      <Header />
    </Wrapper>
  ),
};
