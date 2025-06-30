import type { Meta, StoryObj } from '@storybook/react';
import ForgotPassword from '@atoms/login/ForgotPassword';

const meta: Meta<typeof ForgotPassword> = {
  title: 'Atoms/Login/ForgotPassword',
  component: ForgotPassword,
  parameters: {
    nextIntl: {
      messages: {
        Login: {
          changePassword: 'Forgot your password?',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ForgotPassword>;

export const Default: Story = {
  render: () => <ForgotPassword />,
};
