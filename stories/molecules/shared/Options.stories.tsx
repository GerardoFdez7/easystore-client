import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Edit, Copy, Archive, Settings } from 'lucide-react';
import Options, { type OptionItem } from '@molecules/shared/Options';

const meta: Meta<typeof Options> = {
  title: 'Molecules/Shared/Options',
  component: Options,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showDelete: {
      control: 'boolean',
      description: 'Whether to show the delete option',
    },
    showArchive: {
      control: 'boolean',
      description: 'Whether to show the archive option',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the options menu is disabled',
    },
    tooltipContent: {
      control: 'text',
      description: 'Custom tooltip content for the options button',
    },
    deleteTitle: {
      control: 'text',
      description: 'Custom title for the delete confirmation dialog',
    },
    deleteDescription: {
      control: 'text',
      description: 'Custom description for the delete confirmation dialog',
    },
    archiveTitle: {
      control: 'text',
      description: 'Custom title for the archive confirmation dialog',
    },
    archiveDescription: {
      control: 'text',
      description: 'Custom description for the archive confirmation dialog',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Options>;

async function openMenu(
  canvas: Parameters<NonNullable<Story['play']>>[0]['canvas'],
  name: string,
) {
  await userEvent.click(canvas.getByRole('button', { name }));
  return screen.findByRole('menu');
}

async function closeMenu() {
  await userEvent.keyboard('{Escape}');
  await waitFor(() => storybookExpect(screen.queryByRole('menu')).toBeNull());
}

// Mock custom options
const mockOptions: OptionItem[] = [
  {
    id: 'edit',
    label: 'Edit',
    icon: Edit,
    onClick: fn(),
  },
  {
    id: 'copy',
    label: 'Duplicate',
    icon: Copy,
    onClick: fn(),
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: Archive,
    onClick: fn(),
  },
];

const mockOptionsWithDisabled: OptionItem[] = [
  {
    id: 'edit',
    label: 'Edit',
    icon: Edit,
    onClick: fn(),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    onClick: fn(),
    disabled: true,
  },
  {
    id: 'copy',
    label: 'Duplicate',
    icon: Copy,
    onClick: fn(),
  },
];

export const Default: Story = {
  args: {
    options: mockOptions,
    showDelete: true,
    onDelete: fn(),
    deleteTitle: 'Delete Item',
    deleteDescription:
      'Are you sure you want to delete this item? This action cannot be undone.',
    disabled: false,
    tooltipContent: 'All options',
  },
  play: async ({ canvas, args }) => {
    await openMenu(canvas, 'All options');
    for (const name of ['Edit', 'Duplicate', 'Archive', 'Delete']) {
      await storybookExpect(
        screen.getByRole('menuitem', { name }),
      ).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    await storybookExpect(args.options?.[0].onClick).toHaveBeenCalledTimes(1);

    await userEvent.click(
      await canvas.findByRole('button', { name: 'All options' }),
    );
    await userEvent.click(
      await screen.findByRole('menuitem', { name: 'Delete' }),
    );
    const dialog = await screen.findByRole('alertdialog');
    await storybookExpect(dialog).toHaveTextContent('Delete Item');
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      storybookExpect(args.onDelete).toHaveBeenCalledTimes(1),
    );
  },
};

export const WithArchiveOnly: Story = {
  args: {
    showArchive: true,
    onArchive: fn(),
    archiveTitle: 'Archive Item',
    archiveDescription:
      'Are you sure you want to archive this item? You can restore it later if needed.',
    disabled: false,
    tooltipContent: 'Item options',
  },
  play: async ({ canvas, args }) => {
    await openMenu(canvas, 'Item options');
    await storybookExpect(
      screen.queryByRole('menuitem', { name: 'Delete' }),
    ).toBeNull();
    await userEvent.click(screen.getByRole('menuitem', { name: 'Archive' }));
    await storybookExpect(
      await screen.findByRole('alertdialog'),
    ).toHaveTextContent('Archive Item');
    await userEvent.click(screen.getByRole('button', { name: 'Archive' }));
    await waitFor(() =>
      storybookExpect(args.onArchive).toHaveBeenCalledTimes(1),
    );
  },
};

export const WithArchiveAndDelete: Story = {
  args: {
    showArchive: true,
    onArchive: fn(),
    showDelete: true,
    onDelete: fn(),
    archiveTitle: 'Archive Item',
    archiveDescription:
      'Are you sure you want to archive this item? You can restore it later if needed.',
    deleteTitle: 'Delete Item',
    deleteDescription:
      'Are you sure you want to delete this item? This action cannot be undone.',
    disabled: false,
    tooltipContent: 'All options',
  },
  play: async ({ canvas, args }) => {
    await openMenu(canvas, 'All options');
    await storybookExpect(
      screen.getByRole('menuitem', { name: 'Archive' }),
    ).toBeInTheDocument();
    await storybookExpect(
      screen.getByRole('menuitem', { name: 'Delete' }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    await userEvent.click(
      await screen.findByRole('button', { name: 'Cancel' }),
    );
    await storybookExpect(args.onDelete).not.toHaveBeenCalled();
    await waitFor(() =>
      storybookExpect(screen.queryByRole('alertdialog')).toBeNull(),
    );
  },
};

export const WithDeleteOnly: Story = {
  args: {
    showDelete: true,
    onDelete: fn(),
    deleteTitle: 'Delete Item',
    deleteDescription:
      'Are you sure you want to delete this item? This action cannot be undone.',
    disabled: false,
    tooltipContent: 'Item options',
  },
  play: async ({ canvas }) => {
    await openMenu(canvas, 'Item options');
    await storybookExpect(screen.getAllByRole('menuitem')).toHaveLength(1);
    await closeMenu();
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: mockOptionsWithDisabled,
    showDelete: true,
    onDelete: fn(),
    disabled: false,
    tooltipContent: 'Options with some disabled',
  },
  play: async ({ canvas }) => {
    await openMenu(canvas, 'Options with some disabled');
    await storybookExpect(
      screen.getByRole('menuitem', { name: 'Settings' }),
    ).toHaveAttribute('aria-disabled', 'true');
    await storybookExpect(
      screen.getByRole('menuitem', { name: 'Edit' }),
    ).not.toHaveAttribute('aria-disabled', 'true');
    await closeMenu();
  },
};

export const Disabled: Story = {
  args: {
    options: mockOptions,
    showDelete: true,
    onDelete: fn(),
    disabled: true,
    tooltipContent: 'Disabled options',
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Disabled options' }),
    ).toBeDisabled();
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    showDelete: false,
    disabled: false,
    tooltipContent: 'No options available',
  },
  play: async ({ canvasElement }) => {
    await storybookExpect(canvasElement).toBeEmptyDOMElement();
  },
};

export const InlineOnDesktop: Story = {
  args: {
    options: mockOptionsWithDisabled.map((option) =>
      option.id === 'settings'
        ? { ...option, disabledTooltip: 'Settings unavailable' }
        : option,
    ),
    showDelete: true,
    onDelete: fn(),
    inlineOnDesktop: true,
    tooltipContent: 'All options',
  },
  globals: {
    viewport: { value: 'desktop', isRotated: false },
  },
  play: async ({ canvas, args }) => {
    const edit = canvas.getByRole('button', { name: 'Edit' });
    await storybookExpect(edit).toBeVisible();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Delete' }),
    ).toBeVisible();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Settings' }),
    ).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(edit);
    await storybookExpect(args.options?.[0].onClick).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByRole('button', { name: 'Settings' }));
    await storybookExpect(args.options?.[1].onClick).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole('button', { name: 'Delete' }));
    await storybookExpect(
      await screen.findByRole('alertdialog'),
    ).toBeInTheDocument();
  },
};

export const InlineHiddenOnMobile: Story = {
  args: {
    options: mockOptions,
    showDelete: true,
    onDelete: fn(),
    inlineOnDesktop: true,
    tooltipContent: 'All options',
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'All options' }),
    ).toBeVisible();
    // Role queries skip display:none elements, so the inline button is absent
    await storybookExpect(
      canvas.queryByRole('button', { name: 'Edit' }),
    ).toBeNull();
    await openMenu(canvas, 'All options');
    await storybookExpect(
      screen.getByRole('menuitem', { name: 'Edit' }),
    ).toBeInTheDocument();
    await closeMenu();
  },
};
