import {
  expect as storybookExpect,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MainRegister from '@organisms/authentication/register/MainRegister';

const meta: Meta<typeof MainRegister> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole('button', { name: 'Register' });
    await userEvent.click(submit);
    await waitFor(async () => {
      await storybookExpect(
        canvas.getByText('Invalid email format'),
      ).toBeVisible();
    });
    await userEvent.type(canvas.getByLabelText('Email'), 'jane@example.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'password123');
    await userEvent.type(
      canvas.getByLabelText('Confirm Password'),
      'different123',
    );
    await userEvent.click(submit);
    await waitFor(() =>
      storybookExpect(canvas.getByText('Passwords do not match')).toBeVisible(),
    );
    await storybookExpect(canvas.getByLabelText('Email')).toHaveValue(
      'jane@example.com',
    );
    await storybookExpect(
      canvas.getByRole('link', { name: 'Log in' }),
    ).toHaveAttribute('href', '/login');
    await storybookExpect(
      canvas.getByRole('link', { name: 'Terms and Conditions' }),
    ).toHaveAttribute('href', '/terms');
    await storybookExpect(
      canvas.getByRole('link', { name: 'Privacy Policy' }),
    ).toHaveAttribute('href', '/privacy');
  },
  title: 'Organisms/Authentication/Register/MainRegister',
  parameters: {
    layout: 'fullscreen',
  },
  component: MainRegister,
};
export default meta;

type Story = StoryObj<typeof MainRegister>;

export const Default: Story = {};
