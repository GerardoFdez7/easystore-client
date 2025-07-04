import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IntlProvider } from 'next-intl';
import { SocialAuthButtons } from '@molecules/shared/SocialAuthButtons';

const meta: Meta<typeof SocialAuthButtons> = {
  title: 'Molecules/Shared/SocialAuthButtons',
  component: SocialAuthButtons,
};

export default meta;

type Story = StoryObj<typeof SocialAuthButtons>;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <IntlProvider
      locale="en"
      messages={{
        Register: {
          registerWithGoogle: 'Register with Google',
          registerWithFacebook: 'Register with Facebook',
        },
      }}
    >
      <div className="w-full">{children}</div>
    </IntlProvider>
  );
};

export const Default: Story = {
  render: () => (
    <Wrapper>
      <SocialAuthButtons />
    </Wrapper>
  ),
};
