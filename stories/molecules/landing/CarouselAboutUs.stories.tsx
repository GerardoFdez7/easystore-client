import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import CarouselAboutUs from '@molecules/landing/CarouselAboutUs';

const messages = {
  Landing: {
    foundedT: 'Founded',
    founded: 'In 2024 to serve SMBs worldwide.',
    managedT: 'Managed by',
    managed: 'A small, passionate team.',
    headquartersT: 'HQ',
    headquarters: 'Remote-first, globally distributed.',
    focusT: 'Focus',
    focus: 'Merchant success & growth.',
    missionT: 'Mission',
    mission: 'Empower sellers with great tools.',
  },
};

const meta: Meta<typeof CarouselAboutUs> = {
  title: 'Molecules/Landing/CarouselAboutUs',
  parameters: {
    layout: 'centered',
  },
  component: CarouselAboutUs,
};
export default meta;

type Story = StoryObj<typeof CarouselAboutUs>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <div className="max-w-5xl">
        <CarouselAboutUs />
      </div>
    </NextIntlClientProvider>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('region', { name: 'Founded, Managed by, HQ' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('region', { name: 'Focus, Mission' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('In 2024 to serve SMBs worldwide.'),
    ).toBeInTheDocument();
  },
};
