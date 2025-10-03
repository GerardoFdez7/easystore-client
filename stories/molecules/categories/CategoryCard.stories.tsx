import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryCard from '@molecules/categories/CategoryCard';

const meta: Meta<typeof CategoryCard> = {
  title: 'Molecules/Category/CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'Technology',
    cover: '/laptop.webp',
    count: 12,
    href: '#',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {};
export const LongName: Story = {
  args: { name: 'Super Ultra Mega Long Category Name That Truncates' },
};
