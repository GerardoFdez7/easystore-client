import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SelectType from '@atoms/products/SelectType';
import { TypeEnum } from '@graphql/generated';

const meta: Meta<typeof SelectType> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('combobox', { name: 'Type' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Products/SelectType',
  component: SelectType,
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
      description: 'Whether the select is disabled',
    },
  },
  args: {
    value: undefined,
    onValueChange: () => {},
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof SelectType>;

export const Default: Story = {
  args: {
    value: undefined,
  },
};

export const WithPhysicalSelected: Story = {
  args: {
    value: TypeEnum.Physical,
  },
};

export const WithDigitalSelected: Story = {
  args: {
    value: TypeEnum.Digital,
  },
};

export const Disabled: Story = {
  args: {
    value: TypeEnum.Physical,
    disabled: true,
  },
};
