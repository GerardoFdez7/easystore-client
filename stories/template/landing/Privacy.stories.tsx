import type { Meta, StoryObj } from '@storybook/nextjs';
import PrivacyTemplate from '@templates/landing/Privacy';

const meta: Meta<typeof PrivacyTemplate> = {
  title: 'Templates/Landing/Privacy',
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
