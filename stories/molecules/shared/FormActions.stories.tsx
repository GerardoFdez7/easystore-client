import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FormActions from '@molecules/shared/FormActions';

const meta: Meta<typeof FormActions> = {
  title: 'Molecules/Shared/FormActions',
  component: FormActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSubmitting: {
      control: 'boolean',
      description: 'Shows loading state on save button and disables cancel',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables both buttons',
    },
    showIcons: {
      control: 'boolean',
      description: 'Shows icons on both buttons',
    },
    cancelText: {
      control: 'text',
      description: 'Translation key for cancel button text',
    },
    saveText: {
      control: 'text',
      description: 'Translation key for save button text',
    },
    className: {
      control: 'text',
      description: 'CSS classes for the container',
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof FormActions>;

export const Default: Story = {
  args: {
    isSubmitting: false,
    disabled: false,
    showIcons: false,
    cancelText: 'cancel',
    saveText: 'save',
    onCancel: fn(),
  },
  play: async ({ canvas, args }) => {
    const save = canvas.getByRole('button', { name: 'Save' });
    await storybookExpect(save).toBeEnabled();
    await storybookExpect(save).toHaveAttribute('type', 'submit');
    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await storybookExpect(args.onCancel).toHaveBeenCalledTimes(1);
  },
};

export const WithIcons: Story = {
  args: {
    isSubmitting: false,
    disabled: false,
    showIcons: true,
    cancelText: 'cancel',
    saveText: 'save',
    onCancel: fn(),
  },
  play: async ({ canvas, args }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Save' }).querySelector('svg'),
    ).not.toBeNull();
    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await storybookExpect(args.onCancel).toHaveBeenCalledTimes(1);
  },
};

export const Loading: Story = {
  args: {
    isSubmitting: true,
    disabled: false,
    showIcons: true,
    cancelText: 'cancel',
    saveText: 'save',
    onCancel: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Loading Save' }),
    ).toBeDisabled();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Cancel' }),
    ).toBeDisabled();
  },
};

export const Disabled: Story = {
  args: {
    isSubmitting: false,
    disabled: true,
    showIcons: false,
    cancelText: 'cancel',
    saveText: 'save',
    onCancel: fn(),
  },
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByRole('button', { name: 'Save' }),
    ).toBeDisabled();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Cancel' }),
    ).toBeEnabled();
  },
};

export const VerticalLayout: Story = {
  args: {
    isSubmitting: false,
    disabled: false,
    showIcons: true,
    cancelText: 'cancel',
    saveText: 'save',
    className: 'flex flex-col gap-2 w-32',
    onCancel: fn(),
  },
  play: async ({ canvas }) => {
    const save = canvas.getByRole('button', { name: 'Save' });
    const cancel = canvas.getByRole('button', { name: 'Cancel' });
    await storybookExpect(save.getBoundingClientRect().top).toBeGreaterThan(
      cancel.getBoundingClientRect().top,
    );
  },
};
