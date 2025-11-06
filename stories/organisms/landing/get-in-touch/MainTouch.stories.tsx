import type { Meta, StoryObj } from '@storybook/nextjs';
import MainTouch from '@organisms/landing/get-in-touch/MainTouch';

const meta: Meta<typeof MainTouch> = {
  title: 'Organisms/Landing/GetInTouch/MainTouch',
  component: MainTouch,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MainTouch>;

export const Default: Story = {
  render: () => <MainTouch />,
};
