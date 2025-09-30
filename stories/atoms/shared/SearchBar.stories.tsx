import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '@atoms/shared/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Atoms/Shared/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    searchTerm: {
      control: 'text',
      description: 'Current value of the search term',
    },
    onSearchChange: {
      action: 'search term changed',
      description: 'Callback function when the search term changes',
    },
    className: {
      control: 'text',
      description: 'Optional class names for custom styling',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search products...',
    searchTerm: '',
  },
};

export const WithInitialSearchTerm: Story = {
  args: {
    placeholder: 'Search products...',
    searchTerm: 'initial query',
  },
};

export const WithCustomStyling: Story = {
  args: {
    placeholder: 'Search products...',
    searchTerm: '',
    className: 'border-2 border-red-500',
  },
};
