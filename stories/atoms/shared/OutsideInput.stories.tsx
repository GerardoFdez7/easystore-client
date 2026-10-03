import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Input from '@atoms/shared/OutsideInput';

const meta: Meta<typeof Input> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('textbox')).toBeInTheDocument();
  },
  title: 'Atoms/Shared/OutsideInput',
  parameters: {
    layout: 'centered',
  },
  component: Input,
  args: { label: 'Email', placeholder: 'Enter your email' },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
