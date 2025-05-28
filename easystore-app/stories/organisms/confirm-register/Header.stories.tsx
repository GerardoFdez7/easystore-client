import type { Meta, StoryObj } from '@storybook/react';
import Header from '@organisms/confirm-register/HeaderConfirmRegister';

const meta: Meta<typeof Header> = {
  title: 'Organisms/ConfirmRegister/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => <Header />,
};
