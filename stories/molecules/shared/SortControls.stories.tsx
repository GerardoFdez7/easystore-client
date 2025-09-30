import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  SortControls,
  SortControlsProps,
} from '@molecules/shared/SortControls';
import { SortBy, SortOrder } from '@graphql/generated';
import { useState } from 'react';

const SortControlsStoryWrapper = (args: SortControlsProps) => {
  const [sortBy, setSortBy] = useState<SortBy>(args.sortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(args.sortOrder);

  return (
    <SortControls
      {...args}
      sortBy={sortBy}
      updateSortBy={setSortBy}
      sortOrder={sortOrder}
      updateSortOrder={setSortOrder}
    />
  );
};

const meta: Meta<typeof SortControls> = {
  title: 'Molecules/Shared/SortControls',
  component: SortControls,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sortBy: {
      control: 'select',
      options: Object.values(SortBy),
    },
    sortOrder: {
      control: 'select',
      options: Object.values(SortOrder),
    },
  },
  render: (args) => <SortControlsStoryWrapper {...args} />,
};

export default meta;

type Story = StoryObj<typeof SortControls>;

export const Default: Story = {
  args: {
    sortBy: SortBy.Name,
    sortOrder: SortOrder.Asc,
  },
};
