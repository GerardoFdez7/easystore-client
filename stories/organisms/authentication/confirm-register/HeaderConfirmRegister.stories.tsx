import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from '@organisms/authentication/confirm-register/HeaderConfirmRegister';

const meta: Meta<typeof Header> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Business Name' });
    await storybookExpect(input).toBeRequired();
    await storybookExpect(input).toHaveValue('');
    await userEvent.type(input, 'Acme Store');
    await storybookExpect(input).toHaveValue('Acme Store');
    await storybookExpect(
      canvas.getByRole('heading', { level: 1, name: 'Your Business Details' }),
    ).toBeVisible();
  },
  title: 'Organisms/Authentication/ConfirmRegister/HeaderConfirmRegister',
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
