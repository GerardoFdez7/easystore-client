import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
      control: false,
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

type Play = NonNullable<Story['play']>;

const clicksOnce: Play = async ({ canvas, args }) => {
  const button = canvas.getByRole('button', { name: 'Load More' });
  await storybookExpect(button).toBeEnabled();
  await userEvent.click(button);
  await storybookExpect(args.onClick).toHaveBeenCalledTimes(1);
};

const isBusy: Play = async ({ canvas }) => {
  const button = canvas.getByRole('button', { name: 'Load More' });
  await storybookExpect(button).toBeDisabled();
  await storybookExpect(button).toHaveAttribute('aria-busy', 'true');
};

const isDisabled: Play = async ({ canvas, args }) => {
  const button = canvas.getByRole('button', { name: 'Load More' });
  await storybookExpect(button).toBeDisabled();
  await storybookExpect(button).not.toHaveAttribute('aria-busy', 'true');
  await storybookExpect(args.onClick).not.toHaveBeenCalled();
};

// Default state
export const Default: Story = {
  args: {
    onClick: fn(),
    isLoading: false,
    disabled: false,
    size: 'default',
    showContainer: true,
    iconSize: 'md',
  },
  play: clicksOnce,
};

// Loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  play: isBusy,
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: isDisabled,
};

// Small size variant
export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    iconSize: 'sm',
  },
  play: clicksOnce,
};

// Small size loading
export const SmallSizeLoading: Story = {
  args: {
    ...SmallSize.args,
    isLoading: true,
  },
  play: isBusy,
};

// Large size variant
export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    iconSize: 'lg',
  },
  play: clicksOnce,
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
  play: async (context) => {
    await clicksOnce(context);
    const button = context.canvas.getByRole('button', { name: 'Load More' });
    await storybookExpect(button.parentElement).toBe(context.canvasElement);
    await storybookExpect(button).toHaveTextContent('Load More');
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
  play: async (context) => {
    await clicksOnce(context);
    const button = context.canvas.getByRole('button', { name: 'Load More' });
    await storybookExpect(button).toHaveClass('text-blue-700');
    await storybookExpect(button.parentElement).toHaveClass('pt-6');
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
  play: clicksOnce,
};

// Icon only loading
export const IconOnlyLoading: Story = {
  args: {
    ...IconOnly.args,
    isLoading: true,
  },
  play: isBusy,
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
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button', { name: 'Load More' });
    await storybookExpect(buttons).toHaveLength(3);
    for (const button of buttons) {
      await storybookExpect(button).toBeDisabled();
      await storybookExpect(button).toHaveAttribute('aria-busy', 'true');
    }
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
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button', { name: 'Load More' });
    await storybookExpect(buttons).toHaveLength(3);
    for (const button of buttons) {
      await storybookExpect(button).toBeEnabled();
    }
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
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button', { name: 'Load More' });
    await storybookExpect(buttons).toHaveLength(6);
    // Loading and disabled variants are not interactive.
    await storybookExpect(
      buttons.filter((b) => b.hasAttribute('disabled')),
    ).toHaveLength(4);
    await storybookExpect(
      buttons.filter((b) => b.getAttribute('aria-busy') === 'true'),
    ).toHaveLength(2);
  },
};
