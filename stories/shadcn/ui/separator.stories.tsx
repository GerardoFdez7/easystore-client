import { expect as storybookExpect } from 'storybook/test';
import { Separator } from '@shadcn/ui/separator';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Separator> = {
  play: async ({ canvasElement }) => {
    await storybookExpect(
      canvasElement.querySelector(
        '[data-slot="separator"][data-orientation="vertical"]',
      ),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => {
      return (
        <div className="flex h-50 items-center justify-center">
          <Story />
        </div>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof Separator>;

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-40 w-2 bg-gray-400 rounded',
  },
};
