import type { Meta, StoryObj } from '@storybook/react';
import ImageStart from '@atoms/landing/ImageStart';

const meta: Meta<typeof ImageStart> = {
  title: 'Atoms/Landing/ImageStart',
  component: ImageStart,
  args: { src: '/portrait_image.webp' },
};

export default meta;

type Story = StoryObj<typeof ImageStart>;

export const Default: Story = {};
