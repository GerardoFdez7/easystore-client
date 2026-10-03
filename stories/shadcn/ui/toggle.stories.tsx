import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from '@shadcn/ui/toggle';

const meta: Meta<typeof Toggle> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Bold' }),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Toggle',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Toggle,
  args: { children: 'Bold' },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
