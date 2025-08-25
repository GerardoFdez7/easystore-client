import type { Meta, StoryObj } from '@storybook/nextjs';
import ComboboxCategory from '@atoms/products/ComboboxCategory';

const meta: Meta<typeof ComboboxCategory> = {
  title: 'Atoms/Products/ComboboxCategory',
  component: ComboboxCategory,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The currently selected category ID',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when the selected category changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the combobox is disabled',
    },
  },
  args: {
    value: '',
    onValueChange: () => {},
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ComboboxCategory>;

export const Default: Story = {
  args: {
    value: '',
  },
};

export const WithCategorySelected: Story = {
  args: {
    value: 'electronics',
  },
};
