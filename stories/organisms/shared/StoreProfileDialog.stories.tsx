import { expect as storybookExpect, screen, userEvent } from 'storybook/test';
import StoreProfileDialog from '@organisms/shared/StoreProfileDialog';
import { Button } from '@shadcn/ui/button';
import { Toaster } from '@shadcn/ui/sonner';
import { CurrencyCodes } from '@graphql/generated';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof StoreProfileDialog> = {
  title: 'Organisms/Shared/StoreProfileDialog',
  component: StoreProfileDialog,
  parameters: {
    layout: 'centered',
  },
  args: {
    store: {
      id: 'store-1',
      name: 'Easy Store',
      logo: null,
      description: 'Everything for your home.',
      domain: 'easystore.example',
      currency: CurrencyCodes.Usd,
    },
    children: <Button>Open store profile</Button>,
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof StoreProfileDialog>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open store profile' }),
    );
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toBeInTheDocument();
    await storybookExpect(
      await screen.findByRole('textbox', { name: 'Name' }),
    ).toHaveValue('Easy Store');
    await storybookExpect(
      screen.getByRole('textbox', { name: 'Domain' }),
    ).toHaveValue('easystore.example');
  },
};

export const EditingShowsUnsavedChanges: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open store profile' }),
    );
    const name = await screen.findByRole('textbox', { name: 'Name' });
    await userEvent.type(name, ' Plus');
    await storybookExpect(
      await screen.findByText('You have unsaved changes'),
    ).toBeInTheDocument();
  },
};

export const CancelKeepsDialogOpen: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open store profile' }),
    );
    const name = await screen.findByRole('textbox', { name: 'Name' });
    await userEvent.type(name, ' Plus');
    await userEvent.click(
      await screen.findByRole('button', { name: 'Cancel' }),
    );
    await storybookExpect(screen.getByRole('dialog')).toBeInTheDocument();
    await storybookExpect(
      screen.getByRole('textbox', { name: 'Name' }),
    ).toHaveValue('Easy Store');
  },
};

export const WithLogoCanBeRemoved: Story = {
  args: {
    store: {
      id: 'store-1',
      name: 'Easy Store',
      logo: 'https://ik.imagekit.io/demo/logo.png',
      description: null,
      domain: null,
      currency: CurrencyCodes.Usd,
    },
  },
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open store profile' }),
    );
    await userEvent.click(
      await screen.findByRole('button', { name: /remove/i }),
    );
    await storybookExpect(
      await screen.findByText('You have unsaved changes'),
    ).toBeInTheDocument();
  },
};

export const ToastClickKeepsDialogOpen: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open store profile' }),
    );
    await userEvent.type(
      await screen.findByRole('textbox', { name: 'Name' }),
      ' Plus',
    );
    await userEvent.click(await screen.findByText('You have unsaved changes'));
    await storybookExpect(screen.getByRole('dialog')).toBeInTheDocument();
  },
};
