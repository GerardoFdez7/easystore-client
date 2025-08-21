import type { Meta, StoryObj } from '@storybook/nextjs';
import CarouselMedia from '../../../app/[locale]/components/molecules/shared/CarouselMedia';

const meta: Meta<typeof CarouselMedia> = {
  title: 'Molecules/Shared/CarouselMedia',
  component: CarouselMedia,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CarouselMedia>;

// Sample data for stories
const sampleItems = [
  {
    id: '1',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=800',
    alt: 'Random landscape',
  },
  {
    id: '2',
    type: 'video' as const,
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    alt: 'Mountain view',
  },
  {
    id: '3',
    type: 'image' as const,
    src: 'https://picsum.photos/800/600?grayscale',
    alt: 'Black and white city',
  },
  {
    id: '4',
    type: 'image' as const,
    src: 'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    alt: 'Ocean waves',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    autoScroll: false,
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: '3',
        type: 'image' as const,
        src: 'https://picsum.photos/800/600?grayscale',
        alt: 'Black and white city',
      },
    ],
    autoScroll: false,
  },
};
