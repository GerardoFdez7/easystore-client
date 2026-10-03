import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import CarouselFeature from '@molecules/landing/CarouselFeature';

const messages = {
  Landing: {
    aiIntegratedT: 'AI integrated',
    aiIntegrated: 'Create product content faster.',
    customDomainsT: 'Custom domains',
    customDomains: 'Bring your own domain easily.',
    paymantT: 'Payments',
    paymant: 'Accept major cards & wallets.',
    growBussinessT: 'Grow business',
    growBussiness: 'Insights and analytics built-in.',
    zeroTransactionT: '0% fees',
    zeroTransaction: 'Keep more of what you earn.',
    satIntegrationT: 'SAT integration',
    satIntegration: 'Keep tax workflows connected.',
    noCodeT: 'No-code',
    noCode: 'Launch without writing code.',
    sellEverywhereT: 'Sell everywhere',
    sellEverywhere: 'Web, social, and marketplaces.',
    searchEngineT: 'Search engine',
    searchEngine: 'Fast product search that converts.',
    managedShipmentsT: 'Managed shipments',
    managedShipments:
      'Use our trusted shipping partners to deliver every order.',
  },
};

const meta: Meta<typeof CarouselFeature> = {
  title: 'Molecules/Landing/CarouselFeature',
  parameters: {
    layout: 'centered',
  },
  component: CarouselFeature,
};
export default meta;

type Story = StoryObj<typeof CarouselFeature>;

export const Default: Story = {
  render: () => (
    <NextIntlClientProvider
      locale="en"
      messages={{ ...enMessages, ...messages }}
    >
      <div className="max-w-5xl">
        <CarouselFeature />
      </div>
    </NextIntlClientProvider>
  ),
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('region')).toHaveLength(3);
    await storybookExpect(
      canvas.getByRole('region', {
        name: 'AI integrated, Custom domains, Payments',
      }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Create product content faster.'),
    ).toBeInTheDocument();
  },
};
