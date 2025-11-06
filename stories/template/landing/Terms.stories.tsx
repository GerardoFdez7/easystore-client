import type { Meta, StoryObj } from '@storybook/nextjs';
import TermsTemplate from '@templates/landing/Terms';

const meta: Meta<typeof TermsTemplate> = {
  title: 'Templates/Landing/Terms',
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
