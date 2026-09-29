import Reviews from '@molecules/dashboard/Reviews';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Reviews> = {
  title: 'Molecules/Dashboard/Reviews',
  component: Reviews,
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

type Story = StoryObj<typeof Reviews>;

export const Default: Story = {};
