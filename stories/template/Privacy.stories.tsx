import type { Meta, StoryObj } from '@storybook/react';
import PrivacyTemplate from '@templates/Privacy';

const meta: Meta<typeof PrivacyTemplate> = {
  title: 'Templates/Privacy',
  component: PrivacyTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PrivacyTemplate>;

export const Default: Story = {};
