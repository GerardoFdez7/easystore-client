import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
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
    <NextIntlClientProvider locale="en" messages={messages}>
      <div className="max-w-5xl">
        <CarouselAboutUs />
      </div>
    </NextIntlClientProvider>
  ),
};
