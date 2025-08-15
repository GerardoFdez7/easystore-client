import { SearchBar } from '@atoms/products/SearchBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchBar> = {
  title: 'Atoms/Products/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search products...',
    value: '',
    onChange: (value: string) => console.log('Search:', value),
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search products...',
    value: 'Phone',
    onChange: (value: string) => console.log('Search:', value),
  },
};
