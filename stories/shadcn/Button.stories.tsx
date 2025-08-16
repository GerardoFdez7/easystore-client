import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Button> = {
  title: 'Shadcn/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
  args: { children: 'Button', variant: 'default', size: 'default' },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};
export const Icon: Story = { args: { size: 'icon', children: '🛒' } };
