import type { Meta, StoryObj } from '@storybook/react';
import Main from '@organisms/confirm-register/Main';

const meta: Meta<typeof Main> = {
  title: 'Organisms/ConfirmRegister/Main',
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {};
