import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import ButtonViewMode from '@atoms/products/ButtonViewMode';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ButtonViewMode> = {
  title: 'Atoms/Products/ButtonViewMode',
  component: ButtonViewMode,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof ButtonViewMode>;

export const Default: Story = {
  args: {
    viewMode: 'table',
    onViewModeToggle: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Switch to grid view' });
    await userEvent.click(button);
    await storybookExpect(args.onViewModeToggle).toHaveBeenCalledTimes(1);
  },
};

export const GridMode: Story = {
  args: {
    viewMode: 'grid',
    onViewModeToggle: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Switch to table view' });
    await userEvent.click(button);
    await storybookExpect(args.onViewModeToggle).toHaveBeenCalledTimes(1);
  },
};
