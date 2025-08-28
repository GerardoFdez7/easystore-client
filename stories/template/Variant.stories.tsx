import type { Meta, StoryObj } from '@storybook/nextjs';
import VariantTemplate from '@templates/Variant';

const meta: Meta<typeof VariantTemplate> = {
  title: 'Templates/Variant',
  component: VariantTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof VariantTemplate>;

export const Default: Story = {};
