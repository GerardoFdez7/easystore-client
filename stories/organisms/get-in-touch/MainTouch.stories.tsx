import type { Meta, StoryObj } from '@storybook/react';
import MainTouch from '@organisms/get-in-touch/MainTouch';

const meta: Meta<typeof MainTouch> = {
  title: 'Organisms/GetInTouch/MainTouch',
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
