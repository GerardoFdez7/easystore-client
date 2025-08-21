import type { Meta, StoryObj } from '@storybook/nextjs';
import VideoThumb from '@atoms/shared/VideoThumb';

const meta: Meta<typeof VideoThumb> = {
  title: 'Atoms/Shared/VideoThumb',
  component: VideoThumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
      action: 'clicked',
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
};

export const Selected: Story = {
  args: {
    selected: true,
    index: 1,
    videoSrc:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    altText: 'Selected video thumbnail',
  },
};

export const Loading: Story = {
  args: {
    selected: false,
    index: 3,
    videoSrc:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    altText: 'Loading video thumbnail',
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
    videoSrc: 'https://invalid-video-url.mp4',
    altText: 'Error video thumbnail',
  },
  parameters: {
    docs: {
      description: 'Shows the error state when video fails to load',
    },
  },
};
