import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from '@shadcn/ui/sonner';
import { toast } from 'sonner';
import { Button } from '@atoms/shared/Button';

const meta = {
  title: 'Shadcn/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button onClick={() => toast('This is a default toast')}>
          Show Default Toast
        </Button>
        <Button
          className="bg-secondary"
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
          className="bg-warning"
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
          className="bg-blue-400"
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
