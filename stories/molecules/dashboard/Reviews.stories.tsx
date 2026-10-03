import { expect as storybookExpect, within } from 'storybook/test';
import Reviews from '@molecules/dashboard/Reviews';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Reviews> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Reviews' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText(/100\s+Reviews/),
    ).toBeInTheDocument();
  },
  title: 'Molecules/Dashboard/Reviews',
  component: Reviews,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-screen max-w-225">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Reviews>;

export const Default: Story = {};
