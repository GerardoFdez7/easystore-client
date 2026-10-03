import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoryBreadcrumb from '@molecules/categories/CategoryBreadcrumb';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import { mockCategoryBreadcrumbSuccess } from './mocks/categoryBreadcrumbMocks';

const meta: Meta<typeof CategoryBreadcrumb> = {
  title: 'Molecules/Categories/CategoryBreadcrumb',
  component: CategoryBreadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CategoryBreadcrumb displays a hierarchical navigation breadcrumb for categories. It shows the path from root to current category with dropdown menus for sibling categories when available.',
      },
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <ApolloMswMocks
        mocks={parameters?.apolloMocks || mockCategoryBreadcrumbSuccess}
      >
        <div className="mx-auto w-full max-w-4xl p-4">
          <Story />
        </div>
      </ApolloMswMocks>
    ),
  ],
  argTypes: {
    categoryPath: {
      control: 'object',
      description:
        'Array of category slugs representing the path from root to current category',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof CategoryBreadcrumb>;

export const Default: Story = {
  args: {
    categoryPath: ['electronics', 'computers', 'laptops'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default breadcrumb showing a deep category path with multiple levels.',
      },
    },
  },
  play: async ({ canvas }) => {
    const nav = await canvas.findByRole('navigation', {
      name: 'Breadcrumb navigation',
    });
    await storybookExpect(
      within(nav).getByRole('link', { name: 'Parent categories' }),
    ).toHaveAttribute('href', '/en/categories');
    await storybookExpect(
      within(nav).getAllByRole('button', { name: 'Category options' }),
    ).toHaveLength(2);
    await storybookExpect(within(nav).getByText('Laptops')).toHaveAttribute(
      'aria-current',
      'page',
    );
  },
};

export const SingleLevel: Story = {
  args: {
    categoryPath: ['electronics'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb with only one level category.',
      },
    },
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      await canvas.findByText('Electronics'),
    ).toHaveAttribute('aria-current', 'page');
    await storybookExpect(canvas.queryByRole('button')).toBeNull();
  },
};

export const WithSiblings: Story = {
  args: {
    categoryPath: ['electronics', 'computers'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb showing dropdown menus for categories with multiple siblings.',
      },
    },
  },
  play: async ({ canvas }) => {
    const electronics = await canvas.findByRole('button', {
      name: 'Category options',
    });
    await userEvent.click(electronics);
    await storybookExpect(
      await screen.findByRole('menuitem', { name: 'Clothing' }),
    ).toBeInTheDocument();
    await storybookExpect(
      screen.getByRole('menuitem', { name: 'Electronics' }),
    ).toBeInTheDocument();
    await storybookExpect(electronics).toHaveAttribute('aria-expanded', 'true');
    await storybookExpect(canvas.getByText('Computers')).toHaveAttribute(
      'aria-current',
      'page',
    );
    // Close the menu so the page is not left aria-hidden behind it.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => storybookExpect(screen.queryByRole('menu')).toBeNull());
  },
};

export const DeepPath: Story = {
  args: {
    categoryPath: ['electronics', 'computers', 'accessories', 'keyboards'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with a very deep category path showing multiple levels of navigation.',
      },
    },
  },
  play: async ({ canvas }) => {
    const nav = await canvas.findByRole('navigation', {
      name: 'Breadcrumb navigation',
    });
    await storybookExpect(within(nav).getByText('Keyboards')).toHaveAttribute(
      'aria-current',
      'page',
    );
    await storybookExpect(
      within(nav).getAllByRole('button', { name: 'Category options' }),
    ).toHaveLength(3);
  },
};
