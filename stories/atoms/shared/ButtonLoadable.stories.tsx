import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';

const meta: Meta<typeof ButtonLoadable> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('button', { name: 'Submit' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/ButtonLoadable',
  parameters: {
    layout: 'centered',
  },
  component: ButtonLoadable,
  args: { children: 'Submit', loading: false },
};

export default meta;

type Story = StoryObj<typeof ButtonLoadable>;

export const Default: Story = {};
