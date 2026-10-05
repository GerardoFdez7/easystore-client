import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HelpButton from '@molecules/dashboard/HelpButton';

const meta: Meta<typeof HelpButton> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helpButton = canvas.getByRole('button', { name: 'Help' });

    await userEvent.hover(helpButton);
    await storybookExpect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Help',
    );

    await userEvent.click(helpButton);

    const dialog = await screen.findByRole('dialog', {
      name: 'Need help?',
    });
    const dialogCanvas = within(dialog);

    await storybookExpect(
      dialogCanvas.getByRole('link', { name: 'Continue to Discord' }),
    ).toHaveAttribute('href', 'https://discord.com/invite/35nBjqV4KC');

    await userEvent.click(dialogCanvas.getByRole('button', { name: 'Cancel' }));
    await waitFor(
      () =>
        storybookExpect(
          screen.queryByRole('dialog', { name: 'Need help?' }),
        ).not.toBeInTheDocument(),
      { timeout: 3000 },
    );
  },
  title: 'Molecules/Dashboard/HelpButton',
  component: HelpButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HelpButton>;

export const Default: Story = {};
