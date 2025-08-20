import type { Meta, StoryObj } from '@storybook/nextjs';
import ImageEveryWhere from '@atoms/landing/ImageEveryWhere';

const meta: Meta<typeof ImageEveryWhere> = {
  title: 'Atoms/Landing/ImageEveryWhere',
  parameters: {
    layout: 'centered',
  },
  component: ImageEveryWhere,
  args: { src: '/portrait_image.webp' },
};

export default meta;

type Story = StoryObj<typeof ImageEveryWhere>;

export const Default: Story = {};
