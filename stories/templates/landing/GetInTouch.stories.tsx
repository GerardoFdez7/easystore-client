import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import GetInTouchTemplate from '@templates/landing/GetInTouch';

const meta: Meta<typeof GetInTouchTemplate> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Get in touch with an expert.' }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Landing/GetInTouch',
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
