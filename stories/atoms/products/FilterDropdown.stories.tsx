import { FilterDropdown } from '@atoms/products/ComboboxType';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FilterDropdown> = {
  title: 'Atoms/Products/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    width: { control: 'text' },
    options: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof FilterDropdown>;

export const Default: Story = {
  args: {
    placeholder: 'Select type',
    options: [
      { value: 'physical', label: 'Physical' },
      { value: 'digital', label: 'Digital' },
    ],
    value: '',
    onChange: (value: string) => console.log('Selected:', value),
    width: 'w-32',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Select type',
    options: [
      { value: 'physical', label: 'Physical' },
      { value: 'digital', label: 'Digital' },
    ],
    value: 'physical',
    onChange: (value: string) => console.log('Selected:', value),
    width: 'w-32',
  },
};

export const Category: Story = {
  args: {
    placeholder: 'Select category',
    options: [
      { value: 'home-kitchen', label: 'Home & Kitchen' },
      { value: 'electronics', label: 'Electronics' },
    ],
    value: '',
    onChange: (value: string) => console.log('Selected:', value),
    width: 'w-36',
  },
};
