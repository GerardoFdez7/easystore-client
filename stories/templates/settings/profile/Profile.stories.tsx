import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProfileTemplate from '@templates/settings/profile/Profile';
import { Toaster } from '@shadcn/ui/sonner';

const meta: Meta<typeof ProfileTemplate> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('heading', { name: 'Store Profile' }),
    ).toBeInTheDocument();
  },
  component: ProfileTemplate,
  title: 'Templates/Settings/Profile',
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileTemplate>;

export const Default: Story = {};

export const UnsavedChangesToast: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = await canvas.findByLabelText('Name');
    await storybookExpect(
      screen.queryByText('You have unsaved changes'),
    ).toBeNull();

    await userEvent.type(name, ' Edited');
    await storybookExpect(
      await screen.findByText('You have unsaved changes'),
    ).toBeInTheDocument();
    await storybookExpect(
      screen.getByRole('button', { name: 'Save' }),
    ).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(
      () =>
        storybookExpect(
          screen.queryByText('You have unsaved changes'),
        ).not.toBeInTheDocument(),
      { timeout: 3000 },
    );
    await storybookExpect((name as HTMLInputElement).value).not.toContain(
      'Edited',
    );
  },
};
