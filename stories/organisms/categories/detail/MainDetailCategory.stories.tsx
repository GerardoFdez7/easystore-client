import type { Meta, StoryObj } from '@storybook/nextjs';
import MainDetailCategory from '@organisms/categories/detail/MainDetailCategory';

const meta = {
  title: 'Organisms/Category/Detail/MainDetailCategory',
  component: MainDetailCategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MainDetailCategory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateNew: Story = {
  args: {},
};

export const EditExisting: Story = {
  args: {},
};
