import ButtonViewMode from '@atoms/products/ButtonViewMode';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ButtonViewMode> = {
  title: 'Atoms/Products/ButtonViewMode',
  component: ButtonViewMode,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onViewModeToggle: { action: 'viewModeToggled' },
  },
};
export default meta;

type Story = StoryObj<typeof ButtonViewMode>;

export const Default: Story = {
  args: {
    onViewModeToggle: () => console.log('View mode toggled'),
  },
};
