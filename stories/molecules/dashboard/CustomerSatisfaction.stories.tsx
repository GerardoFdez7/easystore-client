import CustomerSatisfaction from '@molecules/dashboard/CustomerSatisfaction';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CustomerSatisfaction> = {
  title: 'Molecules/Dashboard/CustomerSatisfaction',
  component: CustomerSatisfaction,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CustomerSatisfaction>;

export const Default: Story = {};
