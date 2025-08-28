import type { Meta, StoryObj } from '@storybook/nextjs';
import SaveButton from '@atoms/shared/SaveButton';

const meta: Meta<typeof SaveButton> = {
  title: 'Atoms/Shared/SaveButton',
  component: SaveButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state with spinner',
    },
    showIcon: {
      control: 'boolean',
      description: 'Shows save icon when not loading',
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      description: 'Button variant style',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xl', 'icon'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    translationKey: {
      control: 'text',
      description: 'Translation key for button text',
    },
    loaderSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the loading spinner',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SaveButton>;

export const Default: Story = {
  args: {
    isLoading: false,
    showIcon: true,
    disabled: false,
    translationKey: 'save',
    loaderSize: 'md',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    showIcon: true,
    size: 'xl',
    disabled: false,
    translationKey: 'save',
    loaderSize: 'sm',
  },
};

export const WithoutIcon: Story = {
  args: {
    isLoading: false,
    showIcon: false,
    variant: 'default',
    size: 'default',
    disabled: false,
    translationKey: 'save',
    loaderSize: 'md',
  },
};

export const Secondary: Story = {
  args: {
    isLoading: false,
    showIcon: true,
    variant: 'secondary',
    size: 'default',
    disabled: false,
    translationKey: 'save',
    loaderSize: 'md',
  },
};

export const Outline: Story = {
  args: {
    isLoading: false,
    showIcon: true,
    variant: 'outline',
    size: 'default',
    disabled: false,
    translationKey: 'save',
    loaderSize: 'md',
  },
};

export const Disabled: Story = {
  args: {
    isLoading: false,
    showIcon: true,
    variant: 'default',
    size: 'default',
    disabled: true,
    translationKey: 'save',
    loaderSize: 'md',
  },
};
