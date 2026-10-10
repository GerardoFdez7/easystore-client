import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import DashboardPage from '@templates/Dashboard';
import {
  dashboardMocks,
  expectedTotalRevenue,
} from './dashboard/mocks/dashboardMocks';

const meta: Meta<typeof DashboardPage> = {
  title: 'Templates/Dashboard',
  component: DashboardPage,
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

type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Reference rendering of the dashboard for a store with an active history: KPI cards, a 90-day sales chart with range selector, recent orders in every status, and eight top products. Use the other states in Organisms/Dashboard/MainDashboard.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
    await storybookExpect(
      await canvas.findByRole('heading', { name: 'Total Sales' }),
    ).toBeInTheDocument();
    await storybookExpect(
      (await canvas.findAllByText(expectedTotalRevenue)).length,
    ).toBeGreaterThan(0);
  },
};
