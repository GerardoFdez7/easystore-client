import type { Meta, StoryObj } from '@storybook/nextjs';
import SortOrderSelect from '@atoms/shared/SortOrderSelect';
import { SortOrder } from '@graphql/generated';

const meta: Meta<typeof SortOrderSelect> = {
  title: 'Atoms/Shared/SortOrderSelect',
  component: SortOrderSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SortOrderSelect>;

export const Default: Story = {
  args: {
    value: SortOrder.Asc,
    onChange: (value) => console.log('Sort order changed:', value),
  },
};

export const Descending: Story = {
  args: {
    value: SortOrder.Desc,
    onChange: (value) => console.log('Sort order changed:', value),
  },
};

export const WithCustomClass: Story = {
  args: {
    value: SortOrder.Desc,
    onChange: (value) => console.log('Sort order changed:', value),
    className: 'text-blue-500',
  },
};
