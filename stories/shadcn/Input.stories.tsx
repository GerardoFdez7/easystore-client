import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@shadcn/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Shadcn/Input',
  component: Input,
  args: { placeholder: 'Type here...' },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
