import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from '@shadcn/ui/input';

const meta: Meta<typeof Input> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByPlaceholderText('Type here...'),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Input',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Input,
  args: { placeholder: 'Type here...' },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
