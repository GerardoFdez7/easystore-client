import type { Meta, StoryObj } from '@storybook/react';
import ButtonPlan from '@atoms/confirm-register/ButtonPlan';

const meta: Meta<typeof ButtonPlan> = {
  title: 'Atoms/ConfirmRegister/ButtonPlan',
  component: ButtonPlan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text displayed inside the button',
    },
    selected: {
      control: 'boolean',
      description: 'If true, applies a different visual style',
    },
    onSelect: {
      action: 'clicked',
      description: 'Callback function triggered on click',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonPlan>;

export const Default: Story = {
  args: {
    text: 'Basic',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    text: 'Basic',
    selected: true,
  },
};
