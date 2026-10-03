import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonViewPlans from '@atoms/landing/ButtonViewPlans';

const meta: Meta<typeof ButtonViewPlans> = {
  play: async ({ canvasElement }) => {
    await storybookExpect(
      await within(canvasElement).findByRole('button', { name: 'View plans' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Landing/ButtonViewPlans',
  parameters: {
    layout: 'centered',
  },
  component: ButtonViewPlans,
};

export default meta;

type Story = StoryObj<typeof ButtonViewPlans>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary rounded-lg p-8">
        <Story />
      </div>
    ),
  ],
};
