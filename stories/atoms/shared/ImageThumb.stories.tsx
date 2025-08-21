import type { Meta, StoryObj } from '@storybook/nextjs';
import ImageThumb from '@atoms/shared/ImageThumb';

const meta: Meta<typeof ImageThumb> = {
  title: 'Atoms/Shared/Thumb',
  component: ImageThumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the thumbnail is currently selected',
    },
    index: {
      control: 'number',
      description: 'Index of the thumbnail in the carousel',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when thumbnail is clicked',
    },
    imageSrc: {
      control: 'text',
      description: 'Source URL of the thumbnail image',
    },
    altText: {
      control: 'text',
      description: 'Alt text for the thumbnail image',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageThumb>;

export const Default: Story = {
  args: {
    selected: false,
    index: 0,
    imageSrc: '/portrait_image.webp',
    altText: 'Sample thumbnail image',
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    index: 1,
    imageSrc: '/portrait_image.webp',
    altText: 'Selected thumbnail image',
  },
};

export const WithDifferentImage: Story = {
  args: {
    selected: false,
    index: 2,
    imageSrc: '/laptop.webp',
    altText: 'Laptop thumbnail image',
  },
};
