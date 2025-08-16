import type { Meta, StoryObj } from '@storybook/react';
import LogoImage from '@atoms/shared/LogoImage';

const meta: Meta<typeof LogoImage> = {
  title: 'Atoms/Shared/LogoImage',
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
