import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@shadcn/ui/toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Shadcn/Toggle',
  component: Toggle,
  args: { children: 'Bold' },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
