import type { Meta, StoryObj } from '@storybook/nextjs';
import { TermsContent } from '@organisms/landing/terms/TermsContent';

const meta: Meta<typeof TermsContent> = {
  title: 'Organisms/Landing/Terms/TermsContent',
  component: TermsContent,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TermsContent>;

export const Default: Story = {};
