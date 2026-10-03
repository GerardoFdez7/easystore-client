import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DescriptionEditor } from '@molecules/profile/DescriptionEditor';

const meta: Meta<typeof DescriptionEditor> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('textbox')).toBeInTheDocument();
  },
  component: DescriptionEditor,
  title: 'Molecules/Profile/DescriptionEditor',
};

export default meta;

type Story = StoryObj<typeof DescriptionEditor>;

export const Default: Story = {};
