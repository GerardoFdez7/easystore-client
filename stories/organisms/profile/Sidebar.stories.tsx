import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@organisms/profile/Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Organisms/Profile/Sidebar',
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
