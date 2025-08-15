import type { Meta, StoryObj } from '@storybook/react';
import ProfileTemplate from '@templates/Profile';

const meta: Meta<typeof ProfileTemplate> = {
  component: ProfileTemplate,
  title: 'Templates/Profile',
};

export default meta;

type Story = StoryObj<typeof ProfileTemplate>;

export const Default: Story = {};
