import MainVariant from '@organisms/variant/MainVariant';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainVariant> = {
  title: 'Organisms/Variant/MainVariant',
  component: MainVariant,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MainVariant>;

export const Default: Story = {};
