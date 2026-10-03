import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ConfirmRegisterPage from '@templates/authentication/ConfirmRegister';

const meta: Meta<typeof ConfirmRegisterPage> = {
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
    const input = canvas.getByRole('textbox', { name: 'Business Name' });
    await userEvent.type(input, 'Acme Store');
    await storybookExpect(input).toHaveValue('Acme Store');
  },
  title: 'Templates/Authentication/ConfirmRegister',
  component: ConfirmRegisterPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ConfirmRegisterPage>;

export const Default: Story = {};
