import type { Meta, StoryObj } from '@storybook/react';
import ImageEveryWhere from '@atoms/landing/ImageEveryWhere';

const meta: Meta<typeof ImageEveryWhere> = {
  title: 'Atoms/Landing/ImageEveryWhere',
  component: ImageEveryWhere,
  args: { src: '/portrait_image.webp' },
};

export default meta;

type Story = StoryObj<typeof ImageEveryWhere>;

export const Default: Story = {};
