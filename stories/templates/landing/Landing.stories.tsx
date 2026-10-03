import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LandingPage from '@templates/landing/Landing';

const meta: Meta<typeof LandingPage> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', {
        name: 'Grow Your Brand Effortlessly with EasyStore',
      }),
    ).toBeInTheDocument();
  },
  title: 'Templates/Landing/Landing',
  component: LandingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {};
