import type { Meta, StoryObj } from '@storybook/nextjs';
import LandingPage from '@templates/Landing';

const meta: Meta<typeof LandingPage> = {
  title: 'Templates/Landing',
  component: LandingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {};
