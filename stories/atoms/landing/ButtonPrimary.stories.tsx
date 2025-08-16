import type { Meta, StoryObj } from '@storybook/react';
import ButtonPrimary from '@atoms/landing/ButtonPrimary';

const meta: Meta<typeof ButtonPrimary> = {
  title: 'Atoms/Landing/ButtonPrimary',
  component: ButtonPrimary,
};

export default meta;

type Story = StoryObj<typeof ButtonPrimary>;

export const Default: Story = {};
