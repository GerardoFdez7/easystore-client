import type { Meta, StoryObj } from '@storybook/react';
import HeaderLanding from '@components/organisms/landing/HeaderLanding';

const meta: Meta<typeof HeaderLanding> = {
  title: 'Organisms/Landing/HeaderLanding',
  component: HeaderLanding,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderLanding>;

export const Default: Story = {};
