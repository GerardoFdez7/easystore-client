import type { Meta, StoryObj } from '@storybook/nextjs';
import RegisterTemplate from '@templates/Register';

const meta: Meta<typeof RegisterTemplate> = {
  title: 'Templates/Register',
  component: RegisterTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof RegisterTemplate>;

export const Default: Story = {};
