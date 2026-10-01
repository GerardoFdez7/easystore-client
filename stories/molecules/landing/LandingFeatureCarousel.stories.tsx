import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { Sparkles, Tag } from 'lucide-react';
import LandingFeatureCarousel from '@molecules/landing/LandingFeatureCarousel';

const messages = {
  Landing: {
    firstTitle: 'AI tools',
    firstText: 'Create product content faster.',
    secondTitle: 'Custom domains',
    secondText: 'Use the domain your customers know.',
  },
};

const meta: Meta<typeof LandingFeatureCarousel> = {
  title: 'Molecules/Landing/LandingFeatureCarousel',
  component: LandingFeatureCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LandingFeatureCarousel>;

export const Default: Story = {
  args: {
    items: [
      [Sparkles, 'firstTitle', 'firstText'],
      [Tag, 'secondTitle', 'secondText'],
    ],
    rowSizes: [2],
  },
  render: (args) => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <div className="w-5xl max-w-full">
        <LandingFeatureCarousel {...args} />
      </div>
    </NextIntlClientProvider>
  ),
};
