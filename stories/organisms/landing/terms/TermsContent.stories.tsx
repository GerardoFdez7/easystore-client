import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TermsContent } from '@organisms/landing/terms/TermsContent';

const meta: Meta<typeof TermsContent> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Terms and Conditions' }),
    ).toBeInTheDocument();
  },
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
