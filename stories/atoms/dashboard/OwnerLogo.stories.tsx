import { expect as storybookExpect, within } from 'storybook/test';
import OwnerLogo from '@atoms/dashboard/OwnerLogo';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof OwnerLogo> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('img')).toBeInTheDocument();
  },
  title: 'Atoms/Dashboard/OwnerLogo',
  component: OwnerLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof OwnerLogo>;

export const AuthenticatedTenant: Story = {};
