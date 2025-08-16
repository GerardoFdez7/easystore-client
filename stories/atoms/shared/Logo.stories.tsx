import type { Meta, StoryObj } from '@storybook/react';
import Logo from '@atoms/shared/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Shared/Logo',
  component: Logo,
  args: { src: '/logo.webp', alt: 'EasyStore Logo', label: 'EasyStore' },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
