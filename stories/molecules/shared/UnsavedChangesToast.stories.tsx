import {
  expect as storybookExpect,
  fn,
  userEvent,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UnsavedChangesToast from '@molecules/shared/UnsavedChangesToast';

const meta: Meta<typeof UnsavedChangesToast> = {
  component: UnsavedChangesToast,
  title: 'Molecules/Shared/UnsavedChangesToast',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-lg max-w-full">
        <Story />
      </div>
    ),
  ],
  args: {
    message: 'You have unsaved changes',
    saveLabel: 'Save',
    cancelLabel: 'Cancel',
    onSave: fn(),
    onCancel: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof UnsavedChangesToast>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await storybookExpect(args.onCancel).toHaveBeenCalledOnce();
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
    await storybookExpect(args.onSave).toHaveBeenCalledOnce();
  },
};

export const Saving: Story = {
  args: { isSaving: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: /Save/ }),
    ).toBeDisabled();
    await storybookExpect(
      canvas.getByRole('status', { name: 'Loading' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Cancel' }),
    ).toBeDisabled();
  },
};
