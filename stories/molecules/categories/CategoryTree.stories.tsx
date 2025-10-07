import type { Meta, StoryObj } from '@storybook/nextjs';
import CategoryTree from '@molecules/categories/CategoryTree';
import { MockedProvider } from '@apollo/client/testing/react';
import { mockCategoryTreeSuccess } from './mocks/categoryTreeMocks';

const meta: Meta<typeof CategoryTree> = {
  title: 'Molecules/Category/CategoryTree',
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
      <MockedProvider
        mocks={parameters?.apolloMocks || mockCategoryTreeSuccess}
      >
        <div className="h-screen w-screen">
          <Story />
        </div>
      </MockedProvider>
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
    onOpenChange: () => {},
  },
};
