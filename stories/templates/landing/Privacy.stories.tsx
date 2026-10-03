import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PrivacyTemplate from '@templates/landing/Privacy';

const meta: Meta<typeof PrivacyTemplate> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Privacy Policy' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Landing/PrivacyTemplate',
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
