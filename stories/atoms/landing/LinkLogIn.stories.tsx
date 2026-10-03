import { expect as storybookExpect, within } from 'storybook/test';
import LinkLogIn from '@atoms/landing/LinkLogIn';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof LinkLogIn> = {
  play: async ({ canvasElement }) => {
    await storybookExpect(
      await within(canvasElement).findByRole('link', { name: 'Log in' }),
    ).toHaveAttribute('href', storybookExpect.stringMatching(/^\/login\/?$/));
  },
  title: 'Atoms/Landing/LinkLogIn',
  component: LinkLogIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LinkLogIn>;

export const Default: Story = {};
