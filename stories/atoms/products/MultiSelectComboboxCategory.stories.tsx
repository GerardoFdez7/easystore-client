import MultiSelectComboboxCategory from '@atoms/products/MultiSelectComboboxCategory';
import { MockedProvider } from '@apollo/client/testing/react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  FindCategoriesForPickerDocument,
  SortBy,
  SortOrder,
} from '@graphql/generated';

const categoryPickerMock = {
  request: {
    query: FindCategoriesForPickerDocument,
    variables: {
      page: 1,
      limit: 25,
      name: '',
      parentId: null,
      sortBy: SortBy.Name,
      sortOrder: SortOrder.Asc,
      includeSubcategories: false,
    },
  },
  result: {
    data: {
      getAllCategories: {
        __typename: 'PaginatedCategoriesType',
        total: 3,
        hasMore: false,
        categories: [
          {
            __typename: 'Category',
            id: 'category-electronics',
            name: 'Electronics',
            cover: '/laptop.webp',
          },
          {
            __typename: 'Category',
            id: 'category-home',
            name: 'Home and kitchen',
            cover: '/default.webp',
          },
          {
            __typename: 'Category',
            id: 'category-outdoors',
            name: 'Outdoors',
            cover: '/default.webp',
          },
        ],
      },
    },
  },
};

const meta: Meta<typeof MultiSelectComboboxCategory> = {
  title: 'Atoms/Products/MultiSelectComboboxCategory',
  component: MultiSelectComboboxCategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockedProvider mocks={[categoryPickerMock]}>
        <div className="w-80">
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
  argTypes: {
    value: {
      control: 'object',
      description: 'IDs of the currently selected categories.',
    },
    onValueChange: {
      control: false,
      description: 'Called with the next list of selected category IDs.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables selection and clearing.',
    },
    placeholder: {
      control: 'text',
      description: 'Prompt shown when there are no selected categories.',
    },
  },
  args: {
    onValueChange: () => {},
    placeholder: 'Select categories',
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelectComboboxCategory>;

export const Empty: Story = {
  args: {
    value: [],
  },
};

export const MultipleSelected: Story = {
  args: {
    value: ['category-electronics', 'category-home'],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: ['category-outdoors'],
  },
};
