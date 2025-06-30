import type { Meta, StoryObj } from '@storybook/react';
import LinkToRegister from '@atoms/login/LinkToRegister';

const meta: Meta<typeof LinkToRegister> = {
  title: 'Atoms/Login/LinkToRegister',
  component: LinkToRegister,
  parameters: {
    nextIntl: {
      messages: {
        Login: {
          messageAccount: "Don't have an account?",
          register: 'Register',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkToRegister>;

export const Default: Story = {
  render: () => <LinkToRegister />,
};
