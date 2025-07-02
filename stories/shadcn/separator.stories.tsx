import { Separator } from '@shadcn/ui/separator';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Separator> = {
  title: 'Shadcn/Separator',
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}
        >
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
