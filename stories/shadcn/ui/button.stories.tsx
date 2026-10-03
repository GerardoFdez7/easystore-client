import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@shadcn/ui/button';

const meta: Meta<typeof Button> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: /Button|🛒/ }),
    ).toBeEnabled();
  },
  title: 'Shadcn/UI/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
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
