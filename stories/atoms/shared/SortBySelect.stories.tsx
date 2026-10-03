import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SortBySelect from '@atoms/shared/SortBySelect';
import { SortBy } from '@graphql/generated';

const meta: Meta<typeof SortBySelect> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('combobox', { name: 'Sort' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/SortBySelect',
  component: SortBySelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: [null, ...Object.values(SortBy)],
    },
    onChange: { action: 'onChange' },
    className: { control: 'text' },
    availableOptions: {
      control: 'multi-select',
      options: Object.values(SortBy),
    },
  },
};

export default meta;

type Story = StoryObj<typeof SortBySelect>;

export const Default: Story = {
  args: {
    value: SortBy.Name,
    onChange: () => {},
  },
};

export const Deselected: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
};

export const LimitedOptions: Story = {
  args: {
    value: SortBy.Name,
    availableOptions: [SortBy.Name, SortBy.CreatedAt],
    onChange: () => {},
  },
};
