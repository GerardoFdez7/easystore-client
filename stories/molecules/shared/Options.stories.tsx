import type { Meta, StoryObj } from '@storybook/nextjs';
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

// Mock custom options
const mockOptions: OptionItem[] = [
  {
    id: 'edit',
    label: 'Edit',
    icon: Edit,
    onClick: () => console.log('Edit clicked'),
  },
  {
    id: 'copy',
    label: 'Duplicate',
    icon: Copy,
    onClick: () => console.log('Copy clicked'),
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: Archive,
    onClick: () => console.log('Archive clicked'),
  },
];

const mockOptionsWithDisabled: OptionItem[] = [
  {
    id: 'edit',
    label: 'Edit',
    icon: Edit,
    onClick: () => console.log('Edit clicked'),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    onClick: () => console.log('Settings clicked'),
    disabled: true,
  },
  {
    id: 'copy',
    label: 'Duplicate',
    icon: Copy,
    onClick: () => console.log('Copy clicked'),
  },
];

export const Default: Story = {
  args: {
    options: mockOptions,
    showDelete: true,
    onDelete: () => console.log('Delete clicked'),
    deleteTitle: 'Delete Item',
    deleteDescription:
      'Are you sure you want to delete this item? This action cannot be undone.',
    disabled: false,
    tooltipContent: 'All options',
  },
};

export const WithArchiveOnly: Story = {
  args: {
    showArchive: true,
    onArchive: () => console.log('Archive clicked'),
    archiveTitle: 'Archive Item',
    archiveDescription:
      'Are you sure you want to archive this item? You can restore it later if needed.',
    disabled: false,
    tooltipContent: 'Item options',
  },
};

export const WithArchiveAndDelete: Story = {
  args: {
    showArchive: true,
    onArchive: () => console.log('Archive clicked'),
    showDelete: true,
    onDelete: () => console.log('Delete clicked'),
    archiveTitle: 'Archive Item',
    archiveDescription:
      'Are you sure you want to archive this item? You can restore it later if needed.',
    deleteTitle: 'Delete Item',
    deleteDescription:
      'Are you sure you want to delete this item? This action cannot be undone.',
    disabled: false,
    tooltipContent: 'All options',
  },
};

export const WithDeleteOnly: Story = {
  args: {
    showDelete: true,
    onDelete: () => console.log('Delete clicked'),
    deleteTitle: 'Delete Item',
    deleteDescription:
      'Are you sure you want to delete this item? This action cannot be undone.',
    disabled: false,
    tooltipContent: 'Item options',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: mockOptionsWithDisabled,
    showDelete: true,
    onDelete: () => console.log('Delete clicked'),
    disabled: false,
    tooltipContent: 'Options with some disabled',
  },
};

export const Disabled: Story = {
  args: {
    options: mockOptions,
    showDelete: true,
    onDelete: () => console.log('Delete clicked'),
    disabled: true,
    tooltipContent: 'Disabled options',
  },
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    showDelete: false,
    disabled: false,
    tooltipContent: 'No options available',
  },
};
