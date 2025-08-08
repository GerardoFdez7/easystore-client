import type { Meta, StoryObj } from '@storybook/react';
import MainDetailCategory from '@organisms/detail-category/MainDetailCategory';

const meta = {
  title: 'Organisms/DetailCategory/MainDetailCategory',
  component: MainDetailCategory,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    id: 'new',
  },
} satisfies Meta<typeof MainDetailCategory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CreateNew: Story = {
  args: { id: 'new' },
};

export const EditExisting: Story = {
  args: { id: 'tech' },
};
