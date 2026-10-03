import { expect as storybookExpect, within } from 'storybook/test';
import SalesOverview from '@molecules/dashboard/SalesOverview';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof SalesOverview> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByText(/Sales Overview|Sales/),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Dashboard/SalesOverview',
  component: SalesOverview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SalesOverview>;

export const Default: Story = {};
