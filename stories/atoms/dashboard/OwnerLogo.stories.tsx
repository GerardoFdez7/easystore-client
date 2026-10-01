import OwnerLogo from '@atoms/dashboard/OwnerLogo';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof OwnerLogo> = {
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
