import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TermsTemplate from '@templates/landing/Terms';

const meta: Meta<typeof TermsTemplate> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Terms and Conditions' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Landing/TermsTemplate',
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
