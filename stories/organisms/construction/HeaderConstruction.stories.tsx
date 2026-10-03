import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderConstruction from '@organisms/construction/HeaderConstruction';

const meta: Meta<typeof HeaderConstruction> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', {
        name: "We're Building Something Amazing!",
      }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Construction/HeaderConstruction',
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  component: HeaderConstruction,
};

export default meta;

type Story = StoryObj<typeof HeaderConstruction>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="mb-12 flex flex-1 flex-col items-center justify-center space-y-12 text-center">
        <Story />
      </div>
    ),
  ],
};
