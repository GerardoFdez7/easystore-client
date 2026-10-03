import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toaster } from '@shadcn/ui/sonner';
import { Button } from '@shadcn/ui/button';
import { toast } from 'sonner';

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Show Default Toast' }),
    ).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <div>
      <Toaster />
      <div className="flex flex-col gap-4">
        <Button onClick={() => toast('This is a default toast')}>
          Show Default Toast
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.success('Operation completed successfully')}
        >
          Show Success Toast
        </Button>
        <Button
          className="bg-error"
          onClick={() =>
            toast.error('Failed to save changes', {
              description:
                'Please check your internet connection and try again.',
            })
          }
        >
          Show Error Toast
        </Button>
        <Button
          className="bg-warning text-black"
          onClick={() =>
            toast.warning('Your session will expire soon', {
              description: 'Please save your work before continuing.',
            })
          }
        >
          Show Warning Toast
        </Button>
        <Button
          className="bg-black"
          onClick={() =>
            toast('Toast with action', {
              description: 'This toast has an action button',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo clicked'),
              },
            })
          }
        >
          Show Toast with Action
        </Button>
        <Button
          className="bg-accent text-accent-foreground"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: 'Loading...',
              success: 'Promise resolved successfully',
              error: 'Promise rejected',
            })
          }
        >
          Show Promise Toast
        </Button>
      </div>
    </div>
  ),
};
