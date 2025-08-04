import type { Meta, StoryObj } from '@storybook/react';
import TermsTemplate from '@templates/Terms';

const meta: Meta<typeof TermsTemplate> = {
  title: 'Templates/Terms',
  component: TermsTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TermsTemplate>;

export const Default: Story = {};
