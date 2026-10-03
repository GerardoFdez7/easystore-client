import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ResetPasswordForm from '@molecules/authentication/login/ResetPasswordForm';
import { ApolloMswMocks } from '@lib/storybook/ApolloMswMocks';
import { UpdatePasswordDocument } from '@graphql/generated';

const newPassword = 'NewSecret123';

const updatePasswordMock = (success: boolean, message: string) => ({
  request: {
    query: UpdatePasswordDocument,
    variables: { token: 'mock-reset-token', password: newPassword },
  },
  result: {
    data: { updatePassword: { __typename: 'Response', success, message } },
  },
});

const meta = {
  title: 'Molecules/Authentication/Login/ResetPasswordForm',
  component: ResetPasswordForm,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, { parameters }) => (
      <ApolloMswMocks mocks={parameters.apolloMocks ?? []}>
        <div className="bg-background min-h-screen p-4">
          <Story />
        </div>
      </ApolloMswMocks>
    ),
  ],
} satisfies Meta<typeof ResetPasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

// The dialog is rendered in a portal, so query it through `screen`.
async function fillAndSubmit(confirm: string) {
  const dialog = await screen.findByRole('dialog');
  const passwordInputs = dialog.querySelectorAll('input[type="password"]');
  await userEvent.type(passwordInputs[0] as HTMLElement, newPassword);
  await userEvent.type(passwordInputs[1] as HTMLElement, confirm);
  await userEvent.click(
    screen.getByRole('button', { name: 'Update Password' }),
  );
}

export const NoToken: Story = {
  play: async () => {
    await storybookExpect(screen.queryByRole('dialog')).toBeNull();
  },
};

export const WithToken: Story = {
  parameters: {
    nextjs: { navigation: { query: { token: 'mock-reset-token' } } },
  },
  play: async () => {
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toHaveTextContent('Reset Password');
    await storybookExpect(
      screen.getByRole('button', { name: 'Update Password' }),
    ).toBeEnabled();
  },
};

export const PasswordsDoNotMatch: Story = {
  parameters: {
    nextjs: { navigation: { query: { token: 'mock-reset-token' } } },
  },
  play: async () => {
    await fillAndSubmit('Different123');
    await storybookExpect(
      await screen.findByText("Passwords don't match"),
    ).toBeInTheDocument();
    await storybookExpect(screen.getByRole('dialog')).toBeInTheDocument();
  },
};

export const SuccessfulReset: Story = {
  parameters: {
    nextjs: { navigation: { query: { token: 'mock-reset-token' } } },
    apolloMocks: [updatePasswordMock(true, 'Password updated')],
  },
  play: async () => {
    await fillAndSubmit(newPassword);
    await waitFor(() =>
      storybookExpect(screen.queryByRole('dialog')).toBeNull(),
    );
  },
};

export const WithExpiredToken: Story = {
  parameters: {
    nextjs: { navigation: { query: { token: 'mock-reset-token' } } },
    apolloMocks: [updatePasswordMock(false, 'Token expired')],
  },
  play: async () => {
    await fillAndSubmit(newPassword);
    await storybookExpect(
      await screen.findByText(
        'This reset link has expired. Please request a new one.',
      ),
    ).toBeInTheDocument();
  },
};

export const WithInvalidToken: Story = {
  parameters: {
    nextjs: { navigation: { query: { token: 'mock-reset-token' } } },
    apolloMocks: [updatePasswordMock(false, 'Invalid token')],
  },
  play: async () => {
    await fillAndSubmit(newPassword);
    await storybookExpect(
      await screen.findByText(
        'This reset link has expired. Please request a new one.',
      ),
    ).toBeInTheDocument();
  },
};
