import { expect as storybookExpect, within } from 'storybook/test';
import TopProducts from '@molecules/dashboard/TopProducts';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof TopProducts> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByText(/Top Products|Products/),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Dashboard/TopProducts',
  component: TopProducts,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-screen max-w-250">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof TopProducts>;

export const Default: Story = {};
