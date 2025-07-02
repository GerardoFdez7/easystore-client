import TabDashboard from '@molecules/dashboard/TabDashboard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TabDashboard> = {
  title: 'Molecules/Dashboard/TabDashboard',
  component: TabDashboard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          maxWidth: 800,
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TabDashboard>;

export const Default: Story = {};
