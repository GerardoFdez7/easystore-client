import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoryGrid from '@molecules/categories/CategoryGrid';
import { mockCategories } from './mocks/categoryMocks';

const meta: Meta<typeof CategoryGrid> = {
  title: 'Molecules/Categories/CategoryGrid',
  component: CategoryGrid,
  decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof CategoryGrid>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto">
      <CategoryGrid {...args} />
    </div>
  ),
  args: {
    categories: mockCategories,
    loading: false,
    limit: 25,
  },
  play: async ({ canvas }) => {
    const grid = canvas.getAllByRole('article')[0].parentElement;
    await storybookExpect(grid).toHaveAttribute('aria-busy', 'false');
    await storybookExpect(canvas.getAllByRole('article')).toHaveLength(6);
    await storybookExpect(canvas.getByText('Electronics')).toBeInTheDocument();

    await userEvent.click(canvas.getAllByRole('button', { name: 'Delete' })[0]);
    const dialog = await screen.findByRole('alertdialog');
    await storybookExpect(dialog).toHaveTextContent('Delete category?');
    await userEvent.click(
      screen.getByRole('button', { name: 'Cancel delete' }),
    );
    await waitFor(() =>
      storybookExpect(screen.queryByRole('alertdialog')).toBeNull(),
    );
  },
};

export const Filtered: Story = {
  render: (args) => (
    <div className="mx-auto">
      <CategoryGrid {...args} />
    </div>
  ),
  args: {
    categories: mockCategories,
    loading: false,
    query: 'cloth',
  },
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getAllByRole('article')).toHaveLength(1);
    await storybookExpect(canvas.getByText('Clothing')).toBeInTheDocument();
    await storybookExpect(canvas.queryByText('Electronics')).toBeNull();
  },
};

export const Loading: Story = {
  render: (args) => (
    <div className="mx-auto">
      <CategoryGrid {...args} />
    </div>
  ),
  args: {
    categories: [],
    loading: true,
    limit: 25,
  },
  play: async ({ canvas }) => {
    const grid = canvas.getAllByRole('article')[0].parentElement;
    await storybookExpect(grid).toHaveAttribute('aria-busy', 'true');
    await storybookExpect(
      canvas.getAllByRole('article', { name: 'Loading category' }),
    ).toHaveLength(25);
  },
};
