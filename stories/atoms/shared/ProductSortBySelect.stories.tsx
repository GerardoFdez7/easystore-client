import ProductSortBySelect from '@atoms/shared/ProductSortBySelect';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProductSortBy } from '@graphql/generated';

const meta: Meta<typeof ProductSortBySelect> = {
  title: 'Atoms/Shared/ProductSortBySelect',
  component: ProductSortBySelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: [null, ...Object.values(ProductSortBy)],
      description: 'Current product sort field.',
    },
    onChange: {
      control: false,
      description: 'Called when a product sort field is selected.',
    },
    availableOptions: {
      control: 'multi-select',
      options: Object.values(ProductSortBy),
      description: 'Optional subset of product sort fields to display.',
    },
    className: {
      control: 'text',
      description: 'Additional classes applied to the trigger.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductSortBySelect>;

export const Default: Story = {
  args: {
    value: ProductSortBy.UpdatedAt,
    onChange: () => {},
  },
};

export const LimitedOptions: Story = {
  args: {
    value: ProductSortBy.Name,
    availableOptions: [ProductSortBy.Name, ProductSortBy.CreatedAt],
    onChange: () => {},
  },
};
