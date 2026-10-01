import LinkLogIn from '@atoms/landing/LinkLogIn';
import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof LinkLogIn> = {
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
