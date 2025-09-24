import type { Meta, StoryObj } from '@storybook/nextjs';
import LoadMoreButton from '@atoms/shared/LoadMoreButton';

const meta: Meta<typeof LoadMoreButton> = {
  title: 'Atoms/Shared/LoadMoreButton',
  component: LoadMoreButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable load more button component with loading states and customizable styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the load more action',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Button size variant',
    },
    iconSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Icon size for the loading spinner',
    },
    showContainer: {
      control: 'boolean',
      description: 'Whether to show the container wrapper',
    },
    loadingTextKey: {
      control: 'text',
      description: 'Custom loading text key for translations',
    },
    loadMoreTextKey: {
      control: 'text',
      description: 'Custom load more text key for translations',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the button',
    },
    containerClassName: {
      control: 'text',
      description: 'Container wrapper className for centering',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    onClick: () => console.log('Load more clicked'),
    isLoading: false,
    disabled: false,
    size: 'default',
    showContainer: true,
    iconSize: 'md',
  },
};

// Loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

// Small size variant
export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    iconSize: 'sm',
  },
};

// Small size loading
export const SmallSizeLoading: Story = {
  args: {
    ...SmallSize.args,
    isLoading: true,
  },
};

// Large size variant
export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    iconSize: 'lg',
  },
};

// Without container wrapper
export const WithoutContainer: Story = {
  args: {
    ...Default.args,
    showContainer: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button without the centered container wrapper for custom positioning.',
      },
    },
  },
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    ...Default.args,
    className: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
    containerClassName: 'pt-6 pb-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with custom styling and container padding.',
      },
    },
  },
};

// Icon only variant
export const IconOnly: Story = {
  args: {
    ...Default.args,
    size: 'icon',
    iconSize: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button variant, useful for compact layouts.',
      },
    },
  },
};

// Icon only loading
export const IconOnlyLoading: Story = {
  args: {
    ...IconOnly.args,
    isLoading: true,
  },
};

// Different icon sizes comparison
export const IconSizeComparison: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <LoadMoreButton {...args} iconSize="sm" isLoading />
      <LoadMoreButton {...args} iconSize="md" isLoading />
      <LoadMoreButton {...args} iconSize="lg" isLoading />
    </div>
  ),
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different icon sizes in loading state.',
      },
    },
  },
};

// Size variants comparison
export const SizeComparison: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <LoadMoreButton {...args} size="sm" />
      <LoadMoreButton {...args} size="default" />
      <LoadMoreButton {...args} size="lg" />
    </div>
  ),
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different button sizes.',
      },
    },
  },
};

// All states showcase
export const AllStates: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <LoadMoreButton {...args} />
        <LoadMoreButton {...args} isLoading />
        <LoadMoreButton {...args} disabled />
      </div>
      <div className="flex items-center gap-4">
        <LoadMoreButton {...args} size="sm" />
        <LoadMoreButton {...args} size="sm" isLoading />
        <LoadMoreButton {...args} size="sm" disabled />
      </div>
    </div>
  ),
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all button states in different sizes.',
      },
    },
  },
};
