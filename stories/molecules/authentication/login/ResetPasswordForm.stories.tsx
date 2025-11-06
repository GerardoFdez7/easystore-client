import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect } from 'react';
import ResetPasswordForm from '@molecules/authentication/login/ResetPasswordForm';

// Mock component to simulate different URL states
function ResetPasswordFormWrapper({
  hasToken = false,
  token = 'mock-reset-token',
}: {
  hasToken?: boolean;
  token?: string;
}) {
  useEffect(() => {
    if (hasToken) {
      // Mock URL search params
      const url = new URL(window.location.href);
      url.searchParams.set('token', encodeURIComponent(token));
      window.history.replaceState({}, '', url.toString());
    } else {
      // Clear token from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.toString());
    }
  }, [hasToken, token]);

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold">
          {hasToken
            ? 'Reset Password Form (with token)'
            : 'Reset Password Form (no token)'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {hasToken
            ? 'The reset password dialog should appear automatically'
            : 'No reset token in URL - dialog will not appear'}
        </p>
      </div>
      <ResetPasswordForm />
    </div>
  );
}

const meta = {
  title: 'Molecules/Authentication/Login/ResetPasswordForm',
  component: ResetPasswordFormWrapper,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hasToken: {
      control: 'boolean',
      description: 'Whether a reset token is present in the URL',
    },
    token: {
      control: 'text',
      description: 'The reset token value',
    },
  },
} satisfies Meta<typeof ResetPasswordFormWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasToken: false,
  },
};

export const WithToken: Story = {
  args: {
    hasToken: true,
    token: 'mock-reset-token-12345',
  },
};

export const WithExpiredToken: Story = {
  args: {
    hasToken: true,
    token: 'expired-token',
  },
};

export const WithInvalidToken: Story = {
  args: {
    hasToken: true,
    token: 'invalid-token-format',
  },
};

export const NoToken: Story = {
  args: {
    hasToken: false,
  },
};
