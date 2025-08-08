import type { Meta, StoryObj } from '@storybook/react';
import VariantTemplate from '@templates/Variant';

const meta: Meta<typeof VariantTemplate> = {
  title: 'Templates/Variant',
  component: VariantTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof VariantTemplate>;

export const Default: Story = {};
