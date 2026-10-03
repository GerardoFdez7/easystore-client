import {
  expect as storybookExpect,
  fn,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import VideoThumb from '@atoms/shared/VideoThumb';

const meta: Meta<typeof VideoThumb> = {
  title: 'Atoms/Shared/VideoThumb',
  component: VideoThumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the video thumbnail is currently selected',
    },
    index: {
      control: 'number',
      description: 'Index of the video thumbnail in the carousel',
    },
    onClick: {
      control: false,
      description: 'Callback function when video thumbnail is clicked',
    },
    videoSrc: {
      control: 'text',
      description: 'Source URL of the video for thumbnail generation',
    },
    altText: {
      control: 'text',
      description: 'Alt text for the video thumbnail',
    },
  },
};

export default meta;

type Story = StoryObj<typeof VideoThumb>;

export const Default: Story = {
  args: {
    selected: false,
    index: 0,
    videoSrc:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    altText: 'Big Buck Bunny video thumbnail',
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', {
      name: 'Big Buck Bunny video thumbnail',
    });
    await storybookExpect(button).not.toHaveClass('border-title/75');
    await userEvent.click(button);
    await storybookExpect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    index: 1,
    videoSrc:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    altText: 'Selected video thumbnail',
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', {
      name: 'Selected video thumbnail',
    });
    await storybookExpect(button).toHaveClass('border-title/75');
    await userEvent.click(button);
    await storybookExpect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Loading: Story = {
  args: {
    selected: false,
    index: 3,
    videoSrc: '',
    altText: 'Loading video thumbnail',
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Loading video thumbnail' }),
    ).toBeVisible();
    await storybookExpect(canvas.getByText('Loading...')).toBeVisible();
  },
  parameters: {
    docs: {
      description:
        'Shows the loading state while video metadata is being loaded',
    },
  },
};

export const Error: Story = {
  args: {
    selected: false,
    index: 4,
    videoSrc: '/missing-video.mp4',
    altText: 'Error video thumbnail',
  },
  play: async ({ canvas }) => {
    // The video request 404s, so the thumbnail falls back to the error state.
    await waitFor(() =>
      storybookExpect(canvas.getByText('Error')).toBeVisible(),
    );
    await storybookExpect(
      canvas.queryByText('Loading...'),
    ).not.toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: 'Shows the error state when video fails to load',
    },
  },
};
