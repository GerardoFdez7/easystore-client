import type { Meta, StoryObj } from '@storybook/nextjs';
import Header from '@organisms/authentication/confirm-register/HeaderConfirmRegister';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Authentication/ConfirmRegister/Header',
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
