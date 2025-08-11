import SalesOverview from '@molecules/dashboard/SalesOverview';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof SalesOverview> = {
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
