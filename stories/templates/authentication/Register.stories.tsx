import {
  expect as storybookExpect,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RegisterTemplate from '@templates/authentication/Register';

const meta: Meta<typeof RegisterTemplate> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = within(canvas.getByRole('main'));
    const footer = within(canvas.getByRole('contentinfo'));
    const submit = main.getByRole('button', { name: 'Register' });
    await userEvent.click(submit);
    await waitFor(() =>
      storybookExpect(canvas.getByText('Invalid email format')).toBeVisible(),
    );
    await storybookExpect(
      canvas.getByRole('heading', { level: 1, name: 'Register' }),
    ).toBeVisible();
    await storybookExpect(
      main.getByRole('link', { name: 'Log in' }),
    ).toHaveAttribute('href', '/login');
    await storybookExpect(
      main.getByRole('link', { name: 'Terms and Conditions' }),
    ).toHaveAttribute('href', '/terms');
    await storybookExpect(
      main.getByRole('link', { name: 'Privacy Policy' }),
    ).toHaveAttribute('href', '/privacy');
    await storybookExpect(
      footer.getByRole('link', { name: 'Privacy Policy' }),
    ).toHaveAttribute('href', '/privacy');
  },
  title: 'Templates/Authentication/Register',
  component: RegisterTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof RegisterTemplate>;

export const Default: Story = {};
