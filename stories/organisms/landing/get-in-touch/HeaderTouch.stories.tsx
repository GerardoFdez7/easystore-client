import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderTouch from '@organisms/landing/get-in-touch/HeaderTouch';

const meta: Meta<typeof HeaderTouch> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Navigate to home or scroll to top' }),
    ).toBeInTheDocument();
  },
  title: 'Organisms/Landing/GetInTouch/HeaderTouch',
  component: HeaderTouch,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HeaderTouch>;

export const Default: Story = {
  render: () => <HeaderTouch />,
};
