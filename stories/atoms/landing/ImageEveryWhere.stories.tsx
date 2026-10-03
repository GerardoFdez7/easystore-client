import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageEveryWhere from '@atoms/landing/ImageEveryWhere';

const meta: Meta<typeof ImageEveryWhere> = {
  play: async ({ canvasElement }) => {
    await storybookExpect(
      await within(canvasElement).findByRole('img', { name: 'Image' }),
    ).toHaveAttribute(
      'src',
      storybookExpect.stringContaining('portrait_image.webp'),
    );
  },
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
