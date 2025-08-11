import type { Meta, StoryObj } from '@storybook/nextjs';
import { PrivacyContent } from '@organisms/privacy/PrivacyContent';

const meta: Meta<typeof PrivacyContent> = {
  title: 'Organisms/Privacy/PrivacyContent',
  component: PrivacyContent,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PrivacyContent>;

export const Default: Story = {};
