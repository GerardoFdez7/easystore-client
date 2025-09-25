import type { Meta, StoryObj } from '@storybook/nextjs';
import CancelButton from '@atoms/shared/CancelButton';

const meta: Meta<typeof CancelButton> = {
  title: 'Atoms/Shared/CancelButton',
  component: CancelButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showIcon: {
      control: 'boolean',
      description: 'Shows cancel icon (X)',
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

type Story = StoryObj<typeof CancelButton>;

export const Default: Story = {
  args: {
    showIcon: false,
    disabled: false,
    translationKey: 'cancel',
  },
};

export const WithIcon: Story = {
  args: {
    showIcon: true,
    variant: 'outline',
    size: 'default',
    disabled: false,
    translationKey: 'cancel',
  },
};

export const Secondary: Story = {
  args: {
    showIcon: true,
    variant: 'secondary',
    size: 'default',
    disabled: false,
    translationKey: 'cancel',
  },
};

export const Ghost: Story = {
  args: {
    showIcon: false,
    variant: 'ghost',
    size: 'default',
    disabled: false,
    translationKey: 'cancel',
  },
};

export const Disabled: Story = {
  args: {
    showIcon: true,
    variant: 'outline',
    size: 'default',
    disabled: true,
    translationKey: 'cancel',
  },
};

export const Large: Story = {
  args: {
    showIcon: true,
    variant: 'outline',
    size: 'lg',
    disabled: false,
    translationKey: 'cancel',
  },
};

export const Small: Story = {
  args: {
    showIcon: false,
    variant: 'outline',
    size: 'sm',
    disabled: false,
    translationKey: 'cancel',
  },
};
