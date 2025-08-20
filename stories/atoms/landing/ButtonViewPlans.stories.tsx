import type { Meta, StoryObj } from '@storybook/nextjs';
import ButtonViewPlans from '@atoms/landing/ButtonViewPlans';

const meta: Meta<typeof ButtonViewPlans> = {
  title: 'Atoms/Landing/ButtonViewPlans',
  parameters: {
    layout: 'centered',
  },
  component: ButtonViewPlans,
};

export default meta;

type Story = StoryObj<typeof ButtonViewPlans>;

export const Default: Story = {};
