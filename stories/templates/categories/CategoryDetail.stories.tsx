import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoryDetail from '@templates/categories/CategoryDetail';

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('textbox', { name: 'Name' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Categories/CategoryDetail',
  component: CategoryDetail,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    id: 'new',
  },
} satisfies Meta<typeof CategoryDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NewCategory: Story = {
  args: { id: 'new' },
};

export const EditCategory: Story = {
  args: { id: 'tech' },
};
