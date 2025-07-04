import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Footer from '@organisms/shared/Footer';
import { IntlProvider } from 'next-intl';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Shared/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider
    locale="en"
    messages={{
      Landing: {
        community: 'Community',
        termsConditions: 'Terms & Conditions',
        privacyPolicy: 'Privacy Policy',
        inc: '© 2025 EasyStore, Inc. All rights reserved',
      },
    }}
  >
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow" />
      {children}
    </div>
  </IntlProvider>
);

export const Default: Story = {
  render: () => (
    <Wrapper>
      <Footer />
    </Wrapper>
  ),
};
