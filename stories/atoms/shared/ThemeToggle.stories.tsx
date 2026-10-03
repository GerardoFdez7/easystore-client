import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import ThemeToggle from '@atoms/shared/ThemeToggle';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ThemeToggle> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = await canvas.findByRole('button', {
      name: 'Toggle theme',
    });

    await userEvent.click(toggle);
    await storybookExpect(document.documentElement).toHaveClass('dark');

    await userEvent.click(toggle);
    await storybookExpect(document.documentElement).toHaveClass('light');
  },
  title: 'Atoms/Shared/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  globals: { theme: 'light' },
};
