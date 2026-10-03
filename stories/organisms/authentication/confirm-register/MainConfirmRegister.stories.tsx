import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Main from '@organisms/authentication/confirm-register/MainConfirmRegister';

const meta: Meta<typeof Main> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { level: 2, name: 'Choose a Plan' }),
    ).toBeVisible();
    const monthly = canvas.getByRole('tab', { name: 'Monthly' });
    const yearly = canvas.getByRole('tab', { name: 'Yearly' });
    await storybookExpect(monthly).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(yearly);
    await storybookExpect(yearly).toHaveAttribute('aria-selected', 'true');
    await storybookExpect(monthly).toHaveAttribute('aria-selected', 'false');
    await storybookExpect(
      canvas.getByRole('button', { name: 'Confirm & Register' }),
    ).toBeEnabled();
  },
  title: 'Organisms/Authentication/ConfirmRegister/MainConfirmRegister',
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Main>;

export const Default: Story = {};
