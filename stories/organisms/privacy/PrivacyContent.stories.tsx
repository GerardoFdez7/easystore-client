import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PrivacyContent } from '@organisms/privacy/PrivacyContent';

const meta: Meta<typeof PrivacyContent> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Privacy Policy' }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Landing/Privacy/PrivacyContent',
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
