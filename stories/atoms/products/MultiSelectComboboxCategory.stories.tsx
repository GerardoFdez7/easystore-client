import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
} from 'storybook/test';
import MultiSelectComboboxCategory from '@atoms/products/MultiSelectComboboxCategory';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
      <ApolloMswMocks mocks={[categoryPickerMock]}>
        <div className="w-80">
          <Story />
        </div>
      </ApolloMswMocks>
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
    onValueChange: fn(),
    placeholder: 'Select categories',
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelectComboboxCategory>;

export const Empty: Story = {
  args: {
    value: [],
  },
  play: async ({ canvas, args }) => {
    const combobox = canvas.getByRole('combobox', {
      name: 'Select categories',
    });
    await storybookExpect(combobox).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(combobox);
    await storybookExpect(combobox).toHaveAttribute('aria-expanded', 'true');
    // The category list renders in a portal outside the canvas.
    await userEvent.click(
      await screen.findByRole('option', { name: 'Electronics' }),
    );
    await storybookExpect(args.onValueChange).toHaveBeenCalledWith([
      'category-electronics',
    ]);
    await storybookExpect(
      canvas.queryByRole('button', { name: 'Clear filters' }),
    ).not.toBeInTheDocument();
  },
};

export const MultipleSelected: Story = {
  args: {
    value: ['category-electronics', 'category-home'],
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('combobox', { name: '2 Categories selected' }),
    ).toBeEnabled();
    await userEvent.click(
      canvas.getByRole('button', { name: 'Clear filters' }),
    );
    await storybookExpect(args.onValueChange).toHaveBeenCalledWith([]);
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: ['category-outdoors'],
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('combobox', { name: '1 Category selected' }),
    ).toBeDisabled();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Clear filters' }),
    ).toBeDisabled();
  },
};
