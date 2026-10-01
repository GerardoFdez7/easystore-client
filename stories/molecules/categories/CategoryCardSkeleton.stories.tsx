import CategoryCardSkeleton from '@molecules/categories/CategoryCardSkeleton';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof CategoryCardSkeleton> = {
  title: 'Molecules/Categories/CategoryCardSkeleton',
  component: CategoryCardSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CategoryCardSkeleton>;

export const Loading: Story = {};
