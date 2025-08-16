import type { Meta, StoryObj } from '@storybook/react';
import StepText from '@atoms/landing/StepText';

const meta: Meta<typeof StepText> = {
  title: 'Atoms/Landing/StepText',
  component: StepText,
  args: { number: '1', title: 'Create Account' },
};

export default meta;

type Story = StoryObj<typeof StepText>;

export const Default: Story = {};
