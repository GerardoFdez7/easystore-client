import type { Meta, StoryObj } from '@storybook/react';
import GetInTouchTemplate from '@templates/GetInTouch';

const meta: Meta<typeof GetInTouchTemplate> = {
  title: 'Templates/GetInTouchTemplate',
  component: GetInTouchTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GetInTouchTemplate>;

export const Default: Story = {
  render: () => <GetInTouchTemplate />,
};
