import { expect as storybookExpect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LiPlan from '@atoms/authentication/confirm-register/LiPlan';

const meta: Meta<typeof LiPlan> = {
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
  title: 'Atoms/Authentication/ConfirmRegister/LiPlan',
  component: LiPlan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The feature description',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LiPlan>;

export const Default: Story = {
  args: {
    text: '15 products limit',
  },
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getByRole('listitem')).toHaveTextContent(
      '15 products limit',
    );
  },
};
