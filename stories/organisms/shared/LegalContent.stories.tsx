import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { LegalContent } from '@organisms/shared/LegalContent';

const messages = {
  Privacy: {
    pageTitle: 'Privacy Policy',
    tableOfContents: 'Table of Contents',
    introTitle: 'Introduction',
    introP1: 'EasyStore protects merchant and customer information.',
    introP2: '• Clear policies\n• Responsible data handling',
  },
};

const meta: Meta<typeof LegalContent> = {
  title: 'Organisms/Shared/LegalContent',
  component: LegalContent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LegalContent>;

export const Default: Story = {
  args: {
    namespace: 'Privacy',
    sections: [
      {
        id: 'intro',
        titleKey: 'introTitle',
        bodyKeys: ['introP1', 'introP2'],
      },
    ],
  },
  render: (args) => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <LegalContent {...args} />
    </NextIntlClientProvider>
  ),
};
