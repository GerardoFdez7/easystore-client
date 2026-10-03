import {
  expect as storybookExpect,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LoginTemplate from '@templates/authentication/Login';

const meta = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole('button', { name: 'Log in' });
    await storybookExpect(submit).toHaveAttribute('type', 'submit');
    await userEvent.click(submit);
    await waitFor(async () => {
      await storybookExpect(
        canvas.getByText('Invalid email format'),
      ).toBeVisible();
      await storybookExpect(
        canvas.getByText('Password must be at least 8 characters'),
      ).toBeVisible();
    });
    const reveal = canvas.getByRole('button', { name: /show password/i });
    await storybookExpect(reveal).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(reveal);
    await storybookExpect(
      canvas.getByRole('button', { name: /hide password/i }),
    ).toHaveAttribute('aria-pressed', 'true');
    await storybookExpect(
      canvas.getByRole('link', { name: 'Register' }),
    ).toHaveAttribute('href', '/register');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Forgot password?' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole('dialog', { name: 'Forgot Password' });
    await waitFor(() => storybookExpect(dialog).toBeVisible());
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      storybookExpect(body.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    await storybookExpect(
      canvas.getByRole('heading', { level: 1, name: 'Welcome Back!' }),
    ).toBeVisible();
  },
  title: 'Templates/Authentication/Login',
  component: LoginTemplate,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
