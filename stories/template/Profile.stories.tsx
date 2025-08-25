import type { Meta, StoryObj } from '@storybook/nextjs';
import ProfileTemplate from '@templates/Profile';

const meta: Meta<typeof ProfileTemplate> = {
  component: ProfileTemplate,
  title: 'Templates/Profile',
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileTemplate>;

export const Default: Story = {};
