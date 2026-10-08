import { expect as storybookExpect } from 'storybook/test';
import { MenuIcon } from '@shadcn/ui/lucide-animated/menu';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof MenuIcon> = {
  play: async ({ canvasElement }) => {
    await storybookExpect(
      canvasElement.querySelector('svg'),
    ).toBeInTheDocument();
    await storybookExpect(canvasElement.querySelectorAll('line')).toHaveLength(
      3,
    );
  },
  title: 'Shadcn/UI/LucideAnimated/MenuIcon',
  component: MenuIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
    className: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof MenuIcon>;

export const Default: Story = {
  args: {
    size: 28,
  },
};
