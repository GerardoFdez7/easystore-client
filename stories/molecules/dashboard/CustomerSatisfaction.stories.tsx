import CustomerSatisfaction from '@molecules/dashboard/CustomerSatisfaction';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof CustomerSatisfaction> = {
  title: 'Molecules/Dashboard/CustomerSatisfaction',
  component: CustomerSatisfaction,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-screen max-w-225">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CustomerSatisfaction>;

export const Default: Story = {};
