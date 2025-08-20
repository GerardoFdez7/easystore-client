import type { Meta, StoryObj } from '@storybook/nextjs';
import HeaderLanding from '@organisms/landing/HeaderLanding';

const meta: Meta<typeof HeaderLanding> = {
  title: 'Organisms/Landing/HeaderLanding',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },

  component: HeaderLanding,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeaderLanding>;

export const Default: Story = {};
