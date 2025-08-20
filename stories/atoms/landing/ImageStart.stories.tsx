import type { Meta, StoryObj } from '@storybook/nextjs';
import ImageStart from '@atoms/landing/ImageStart';

const meta: Meta<typeof ImageStart> = {
  title: 'Atoms/Landing/ImageStart',
  parameters: {
    layout: 'centered',
  },
  component: ImageStart,
  args: { src: '/portrait_image.webp' },
};

export default meta;

type Story = StoryObj<typeof ImageStart>;

export const Default: Story = {};
