import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonPlan from '@atoms/authentication/confirm-register/ButtonPlan';

const meta: Meta<typeof ButtonPlan> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: /\S/ }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Authentication/ConfirmRegister/ButtonPlan',
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
  decorators: [
    (Story) => (
      <div className="w-75">
        <Story />
      </div>
    ),
  ],
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
