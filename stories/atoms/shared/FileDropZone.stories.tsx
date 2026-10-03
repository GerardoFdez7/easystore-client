import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FileDropZone from '@atoms/shared/FileDropZone';

const meta: Meta<typeof FileDropZone> = {
  title: 'Atoms/Shared/FileDropZone',
  component: FileDropZone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96 p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxImageSize: 5,
    maxVideoSize: 50,
    disabled: false,
    multiple: false,
    onFileSelect: fn(),
  },
  argTypes: {
    onFileSelect: {
      control: false,
      description: 'Called with the valid files',
    },
    acceptedFileTypes: {
      control: 'object',
      description: 'Array of accepted MIME types',
    },
    maxImageSize: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Maximum image file size in MB',
    },
    maxVideoSize: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Maximum video file size in MB',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the drop zone',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileDropZone>;

export const Default: Story = {
  play: async ({ canvas, canvasElement, args }) => {
    await storybookExpect(canvas.getByText('Upload media files')).toBeVisible();
    await storybookExpect(
      canvas.getByText('Images: jpeg, png, webp, gif (5MB)'),
    ).toBeVisible();
    const input =
      canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    await storybookExpect(input).toBeInTheDocument();
    const file = new File(['image-bytes'], 'photo.png', { type: 'image/png' });
    await userEvent.upload(input as HTMLInputElement, file);
    await storybookExpect(args.onFileSelect).toHaveBeenCalledWith([file]);
    await storybookExpect(canvas.queryByRole('alert')).not.toBeInTheDocument();
  },
};

export const RejectsUnsupportedFile: Story = {
  play: async ({ canvas, canvasElement, args }) => {
    const input =
      canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    // Bypass the input's accept filter, as a drag and drop would.
    const user = userEvent.setup({ applyAccept: false });
    await user.upload(
      input as HTMLInputElement,
      new File(['text'], 'notes.txt', { type: 'text/plain' }),
    );
    await storybookExpect(await canvas.findByRole('alert')).toHaveTextContent(
      'File type text/plain is not supported',
    );
    await storybookExpect(args.onFileSelect).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvas, canvasElement }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Choose Files' }),
    ).toBeDisabled();
    await storybookExpect(
      canvasElement.querySelector('input[type="file"]'),
    ).toBeDisabled();
  },
};

export const WithError: Story = {
  args: {
    error: 'File type not supported. Please select a valid image file.',
  },
  play: async ({ canvas }) => {
    await storybookExpect(await canvas.findByRole('alert')).toHaveTextContent(
      'File type not supported. Please select a valid image file.',
    );
    await storybookExpect(
      canvas.getByRole('button', { name: 'Choose Files' }),
    ).toBeEnabled();
  },
};
