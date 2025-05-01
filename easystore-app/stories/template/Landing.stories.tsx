import type { Meta, StoryObj } from '@storybook/react';
import LandingPage from '@components/templates/Landing';

const meta: Meta<typeof LandingPage> = {
  title: 'Templates/Landing',
  component: LandingPage,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {};
