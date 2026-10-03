import { expect as storybookExpect, within } from 'storybook/test';
import CategoryCardSkeleton from '@molecules/categories/CategoryCardSkeleton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof CategoryCardSkeleton> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('article', { name: 'Loading category' }),
    ).toBeInTheDocument();
  },
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
