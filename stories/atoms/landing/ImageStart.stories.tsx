import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageStart from '@atoms/landing/ImageStart';

const meta: Meta<typeof ImageStart> = {
  play: async ({ canvasElement }) => {
    await storybookExpect(
      await within(canvasElement).findByRole('img', { name: 'Image' }),
    ).toHaveAttribute(
      'src',
      storybookExpect.stringContaining('portrait_image.webp'),
    );
  },
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
