import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from '@shadcn/ui/input';

const meta: Meta<typeof Input> = {
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
