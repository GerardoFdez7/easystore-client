import type { Meta, StoryObj } from '@storybook/nextjs';
import Main from '@organisms/authentication/confirm-register/MainConfirmRegister';

const meta: Meta<typeof Main> = {
  title: 'Organisms/Authentication/ConfirmRegister/Main',
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {};
