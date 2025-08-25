import type { Meta, StoryObj } from '@storybook/nextjs';
import ComboboxType from '@atoms/products/ComboboxType';

const meta: Meta<typeof ComboboxType> = {
  title: 'Atoms/Products/ComboboxType',
  component: ComboboxType,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['', 'physical', 'digital'],
      description: 'The currently selected value',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when the selected value changes',
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

type Story = StoryObj<typeof ComboboxType>;

export const Default: Story = {
  args: {
    value: '',
  },
};

export const WithPhysicalSelected: Story = {
  args: {
    value: 'physical',
  },
};

export const WithDigitalSelected: Story = {
  args: {
    value: 'digital',
  },
};
