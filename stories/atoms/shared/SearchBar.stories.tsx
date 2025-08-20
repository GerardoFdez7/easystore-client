import { SearchBar } from '@atoms/shared/SearchBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchBar> = {
  title: 'Atoms/Shared/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search products...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search products...',
  },
};
