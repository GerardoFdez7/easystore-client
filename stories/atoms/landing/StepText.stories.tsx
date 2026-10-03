import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StepText from '@atoms/landing/StepText';

const meta: Meta<typeof StepText> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByText('1')).toBeInTheDocument();
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Create Account' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Landing/StepText',
  parameters: {
    layout: 'centered',
  },
  component: StepText,
  args: { number: '1', title: 'Create Account' },
};

export default meta;

type Story = StoryObj<typeof StepText>;

export const Default: Story = {};
