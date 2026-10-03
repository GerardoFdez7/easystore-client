import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LogoImage from '@atoms/shared/LogoImage';

const meta: Meta<typeof LogoImage> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('img')).toBeInTheDocument();
  },
  title: 'Atoms/Shared/LogoImage',
  parameters: {
    layout: 'centered',
  },
  component: LogoImage,
  args: { src: '/logo.webp', alt: 'Image', width: 40, height: 40 },
};

export default meta;

type Story = StoryObj<typeof LogoImage>;

export const Default: Story = {
  args: {
    src: '/logo.webp',
  },
};
