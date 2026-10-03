import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MainTouch from '@organisms/landing/get-in-touch/MainTouch';

const meta: Meta<typeof MainTouch> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Get in touch with an expert.' }),
    ).toBeInTheDocument();
  },
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
