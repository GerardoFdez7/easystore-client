import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import AboutUs from '@molecules/landing/AboutUs';

const messages = {
  Landing: {
    aboutTitle: 'About EasyStore',
    aboutText1: 'We were founded to make commerce simple.',
    aboutText2: 'We help you sell everywhere.',
    aboutText3: 'We are a global team with local mindset.',
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

const meta: Meta<typeof AboutUs> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('heading', { name: 'About EasyStore' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Empower sellers with great tools.'),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Landing/AboutUs',
  parameters: {
    layout: 'centered',
  },
  component: AboutUs,
};
export default meta;

type Story = StoryObj<typeof AboutUs>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <AboutUs />
    </NextIntlClientProvider>
  ),
};
