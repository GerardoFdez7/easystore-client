import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
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
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <div className="w-5xl max-w-full">
        <LandingFeatureCarousel {...args} />
      </div>
    </NextIntlClientProvider>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('region', { name: 'AI tools, Custom domains' }),
    ).toBeInTheDocument();
    await storybookExpect(canvas.getByText('AI tools')).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Use the domain your customers know.'),
    ).toBeInTheDocument();
  },
};
