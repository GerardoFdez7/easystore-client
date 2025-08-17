import type { Meta, StoryObj } from '@storybook/react';
import Description from '@atoms/product-detail/Description';

const meta: Meta<typeof Description> = {
  title: 'Atoms/Product Detail/Description',
  component: Description,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the textarea',
    },
    label: {
      control: 'text',
      description: 'Label text for the textarea',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Description',
    className: 'w-100',
  },
};

export const LongDescription: Story = {
  args: {
    label: 'Long Description',
    className: 'h-32 w-100',
  },
};

export const ShortDescription: Story = {
  args: {
    label: 'Short Description',
    className: 'h-20 w-100',
  },
};

export const CustomHeight: Story = {
  args: {
    label: 'Custom Height Description',
    className: 'h-40 w-100',
  },
};
