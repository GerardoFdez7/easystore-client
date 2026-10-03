import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoryTree from '@molecules/categories/CategoryTree';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import {
  mockCategoryTreeEmpty,
  mockCategoryTreeSuccess,
} from './mocks/categoryTreeMocks';

const meta: Meta<typeof CategoryTree> = {
  title: 'Molecules/Categories/CategoryTree',
  component: CategoryTree,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CategoryTree displays a hierarchical tree structure of categories in a sliding sheet panel. It supports expanding/collapsing categories and navigation to category detail pages.',
      },
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <ApolloMswMocks
        mocks={parameters?.apolloMocks || mockCategoryTreeSuccess}
      >
        <div className="h-screen w-screen">
          <Story />
        </div>
      </ApolloMswMocks>
    ),
  ],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the category tree sheet is open',
    },
    onOpenChange: {
      description: 'Callback function when sheet open state changes',
    },
  },
};
export default meta;

type Story = StoryObj<typeof CategoryTree>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: fn(),
  },
  play: async () => {
    const dialog = await screen.findByRole('dialog', { name: 'Category Tree' });
    await storybookExpect(dialog).toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: 'Collapse all' });
    await storybookExpect(toggle).toHaveAttribute('aria-pressed', 'true');
    await storybookExpect(
      await screen.findByRole('button', {
        name: 'Navigate to Laptops category',
      }),
    ).toBeVisible();

    await userEvent.click(toggle);
    await storybookExpect(
      screen.getByRole('button', { name: 'Expand all' }),
    ).toHaveAttribute('aria-pressed', 'false');
    await storybookExpect(
      screen.queryByRole('button', { name: 'Navigate to Laptops category' }),
    ).toBeNull();
    await storybookExpect(
      screen.getByRole('button', { name: 'Navigate to Electronics category' }),
    ).toBeVisible();
  },
};

export const Empty: Story = {
  args: {
    open: true,
    onOpenChange: fn(),
  },
  parameters: {
    apolloMocks: mockCategoryTreeEmpty,
  },
  play: async () => {
    await screen.findByRole('dialog', { name: 'Category Tree' });
    await storybookExpect(await screen.findByRole('tree')).toBeInTheDocument();
    await storybookExpect(screen.queryAllByRole('treeitem')).toHaveLength(0);
  },
};
