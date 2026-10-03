import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SortByControl from '@atoms/shared/SortByControl';

const options = [
  { value: 'name', label: 'Name' },
  { value: 'createdAt', label: 'Created at' },
  { value: 'updatedAt', label: 'Updated at' },
];

const meta: Meta<typeof SortByControl> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('combobox', { name: 'Sort by' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/SortByControl',
  component: SortByControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional classes applied to the select trigger.',
    },
    defaultValue: {
      control: 'select',
      options: options.map((option) => option.value),
      description: 'Fallback selection when the control is uncontrolled.',
    },
    value: {
      control: 'select',
      options: options.map((option) => option.value),
      description: 'Current controlled selection.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SortByControl>;

export const Default: Story = {
  args: {
    defaultValue: 'name',
    onChange: () => {},
    options,
    placeholder: 'Sort by',
    value: 'name',
  },
};

export const LimitedOptions: Story = {
  args: {
    defaultValue: 'createdAt',
    onChange: () => {},
    options: options.slice(0, 2),
    placeholder: 'Sort by',
    value: 'createdAt',
  },
};
