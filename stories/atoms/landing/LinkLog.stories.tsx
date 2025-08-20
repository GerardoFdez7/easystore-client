import type { Meta, StoryObj } from '@storybook/nextjs';
import LinkLog from '@atoms/landing/LinkLogIn';

const meta: Meta<typeof LinkLog> = {
  title: 'Atoms/Landing/LinkLog',
  parameters: {
    layout: 'centered',
  },
  component: LinkLog,
};

export default meta;

type Story = StoryObj<typeof LinkLog>;

export const Default: Story = {};
