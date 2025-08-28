import type { Meta, StoryObj } from '@storybook/nextjs';
import HeaderTouch from '@organisms/get-in-touch/HeaderTouch';

const meta: Meta<typeof HeaderTouch> = {
  title: 'Organisms/GetInTouch/HeaderTouch',
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
