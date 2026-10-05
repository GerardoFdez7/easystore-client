import {
  expect as storybookExpect,
  screen,
  userEvent,
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

    const overlay = document.querySelector<HTMLElement>(
      '[data-slot="dialog-overlay"]',
    );
    if (!overlay) {
      throw new Error('Expected the dialog overlay to be rendered');
    }

    await userEvent.click(overlay);
    await storybookExpect(
      screen.queryByRole('dialog', { name: 'Need help?' }),
    ).not.toBeInTheDocument();
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
