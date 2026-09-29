import TopProducts from '@molecules/dashboard/TopProducts';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof TopProducts> = {
  title: 'Molecules/Dashboard/TopProducts',
  component: TopProducts,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-screen max-w-250">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TopProducts>;

export const Default: Story = {};
