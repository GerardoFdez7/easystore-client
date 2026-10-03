import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonPrimary from '@atoms/landing/ButtonPrimary';

const meta: Meta<typeof ButtonPrimary> = {
  play: async ({ canvasElement }) => {
    const button = await within(canvasElement).findByRole('button', {
      name: 'Start Free',
    });
    await storybookExpect(button.closest('a')).toHaveAttribute(
      'href',
      '/register',
    );
  },
  title: 'Atoms/Landing/ButtonPrimary',
  parameters: {
    layout: 'centered',
  },
  component: ButtonPrimary,
};

export default meta;

type Story = StoryObj<typeof ButtonPrimary>;

export const Default: Story = {};
