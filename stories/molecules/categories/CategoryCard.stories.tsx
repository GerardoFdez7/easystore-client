import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoryCard from '@molecules/categories/CategoryCard';
import CategoryCardSkeleton from '@molecules/categories/CategoryCardSkeleton';

const meta: Meta<typeof CategoryCard> = {
  title: 'Molecules/Categories/CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'Technology',
    cover: '/laptop.webp',
    count: 12,
    href: '#',
    onClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {
  play: async ({ canvas, args }) => {
    await storybookExpect(canvas.getByText('Technology')).toBeInTheDocument();
    await storybookExpect(canvas.getByText(/12\s+subcategories/)).toBeVisible();

    await userEvent.click(
      canvas.getByRole('link', { name: 'View category details' }),
    );
    await storybookExpect(args.onClick).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByRole('button', { name: 'Edit' }));
    await storybookExpect(args.onEdit).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByRole('button', { name: 'Delete' }));
    await storybookExpect(args.onDelete).toHaveBeenCalledTimes(1);
    // Edit/Delete must not trigger the card navigation handler.
    await storybookExpect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const LongName: Story = {
  args: { name: 'Super Ultra Mega Long Category Name That Truncates' },
  play: async ({ canvas }) => {
    const title = canvas.getByText(
      'Super Ultra Mega Long Category Name That Truncates',
    );
    await storybookExpect(title).toBeInTheDocument();
    await storybookExpect(title).toHaveClass('line-clamp-2');
  },
};

export const HiddenCount: Story = {
  args: { hideCount: true },
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getByText('Technology')).toBeInTheDocument();
    await storybookExpect(canvas.queryByText(/subcategories/)).toBeNull();
  },
};

export const Loading: Story = {
  render: () => <CategoryCardSkeleton />,
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('article', { name: 'Loading category' }),
    ).toBeInTheDocument();
    await storybookExpect(canvas.queryByRole('button')).toBeNull();
  },
};
