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
      <div
        style={{
          width: '100vw',
          maxWidth: 900,
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Reviews>;

export const Default: Story = {};
