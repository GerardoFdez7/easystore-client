import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryBreadcrumb from '@molecules/categories/CategoryBreadcrumb';
import { MockedProvider } from '@apollo/client/testing/react';
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
      <MockedProvider
        mocks={parameters?.apolloMocks || mockCategoryBreadcrumbSuccess}
      >
        <div className="mx-auto w-full max-w-4xl p-4">
          <Story />
        </div>
      </MockedProvider>
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
};
