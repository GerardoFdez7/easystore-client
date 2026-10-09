import { expect as storybookExpect, waitFor, within } from 'storybook/test';
import MainDashboard from '@organisms/dashboard/MainDashboard';
import type { Decorator, Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import {
  dashboardMocks,
  emptyDashboardMocks,
  errorDashboardMocks,
  expectedTotalRevenue,
  historicalOrdersDashboardMocks,
  loadingDashboardMocks,
} from '../../templates/dashboard/mocks/dashboardMocks';

const meta: Meta<typeof MainDashboard> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Dashboard/MainDashboard',
  component: MainDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ApolloMswMocks mocks={dashboardMocks}>
        <Story />
      </ApolloMswMocks>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MainDashboard>;

const withMocks = (
  mocks: Parameters<typeof ApolloMswMocks>[0]['mocks'],
): Decorator =>
  function DashboardMocks(Story) {
    return (
      <ApolloMswMocks mocks={mocks}>
        <Story />
      </ApolloMswMocks>
    );
  };

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('heading', { name: 'Total Sales' }),
    ).toBeInTheDocument();
    await storybookExpect(
      (await canvas.findAllByText(expectedTotalRevenue)).length,
    ).toBeGreaterThan(0);
  },
};

export const Loading: Story = {
  decorators: [withMocks(loadingDashboardMocks)],
  parameters: {
    docs: {
      description: {
        story:
          'The request never resolves, so the skeletons stay visible. The range selector is real because it needs no server data.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      storybookExpect(
        canvasElement.querySelector('[aria-busy="true"]'),
      ).toBeInTheDocument(),
    );
  },
};

export const Empty: Story = {
  decorators: [withMocks(emptyDashboardMocks)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByText('No Orders Yet'),
    ).toBeInTheDocument();
  },
};

export const OnlyHistoricalOrders: Story = {
  decorators: [withMocks(historicalOrdersDashboardMocks)],
  parameters: {
    docs: {
      description: {
        story:
          'The reporting period has no orders but older orders exist, so the dashboard stays visible instead of showing the empty state.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('heading', { name: 'Total Sales' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.queryByText('No Orders Yet', { selector: 'h3, h2' }),
    ).not.toBeInTheDocument();
  },
};

export const Error: Story = {
  decorators: [withMocks(errorDashboardMocks)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByText('Dashboard unavailable'),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument();
  },
};
