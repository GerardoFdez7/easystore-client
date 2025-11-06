import type { Meta, StoryObj } from '@storybook/nextjs';
import GetInTouchTemplate from '@templates/landing/GetInTouch';

const meta: Meta<typeof GetInTouchTemplate> = {
  title: 'Templates/Landing/GetInTouchTemplate',
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
