import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PlanBasic from '@molecules/authentication/confirm-register/PlanBasic';

const meta: Meta<typeof PlanBasic> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByText('$0')).toBeInTheDocument();
  },
  title: 'Molecules/Authentication/ConfirmRegister/PlanBasic',
  component: PlanBasic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    price: {
      control: 'text',
      description: 'Price',
    },
    selected: {
      control: 'boolean',
      description: 'Marks whether this plan is currently selected.',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback triggered when the plan is selected.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PlanBasic>;

export const Default: Story = {
  args: {
    price: '$0',
    selected: false,
  },
};
