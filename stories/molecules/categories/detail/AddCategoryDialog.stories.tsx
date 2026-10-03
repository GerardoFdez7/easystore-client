import {
  expect as storybookExpect,
  fn,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AddCategoryDialog from '@molecules/categories/detail/AddCategoryDialog';
import { Button } from '@shadcn/ui/button';
import { Plus } from 'lucide-react';

const meta: Meta<typeof AddCategoryDialog> = {
  title: 'Molecules/Categories/Detail/AddCategoryDialog',
  component: AddCategoryDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AddCategoryDialog is a modal dialog component for creating new categories. It provides a form with fields for category name, description, and cover image upload. The component supports both controlled and uncontrolled open states and can be triggered by custom elements.',
      },
    },
  },
  argTypes: {
    parentId: {
      control: 'text',
      description: 'Optional parent category ID for creating subcategories',
    },
    onAdd: {
      action: 'category-added',
      description: 'Callback function called when a new category is added',
    },
    onSuccess: {
      action: 'success',
      description: 'Callback function called on successful category creation',
    },
    trigger: {
      control: false,
      description: 'Custom trigger element to open the dialog',
    },
    children: {
      control: false,
      description: 'Custom children to use as dialog trigger',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the trigger button',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state of the dialog',
    },
    onOpenChange: {
      action: 'open-changed',
      description: 'Callback for controlled open state changes',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AddCategoryDialog>;

export const Default: Story = {
  args: {
    open: true,
    onAdd: fn(),
    onOpenChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'AddCategoryDialog opened with the standard form. Typing a name enables the Add button, which emits the new category.',
      },
    },
  },
  play: async ({ args }) => {
    const dialog = await screen.findByRole('dialog');
    await storybookExpect(dialog).toHaveTextContent('Add Category');
    const add = screen.getByRole('button', { name: 'Add' });
    await storybookExpect(add).toBeDisabled();

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Name' }),
      'Books',
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Description' }),
      'All the books',
    );
    await storybookExpect(add).toBeEnabled();
    await storybookExpect(dialog).toBeInTheDocument();

    await userEvent.click(add);
    await waitFor(() =>
      storybookExpect(args.onAdd).toHaveBeenCalledWith(
        storybookExpect.objectContaining({
          name: 'Books',
          description: 'All the books',
        }),
      ),
    );
    await storybookExpect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

export const Cancel: Story = {
  args: {
    open: true,
    onAdd: fn(),
    onOpenChange: fn(),
  },
  play: async ({ args }) => {
    await screen.findByRole('dialog');
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await storybookExpect(args.onOpenChange).toHaveBeenCalledWith(false);
    await storybookExpect(args.onAdd).not.toHaveBeenCalled();
  },
};

export const InteractiveExample: Story = {
  args: {
    onAdd: fn(),
  },
  render: (args) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Try adding a category:</h3>
      <AddCategoryDialog
        onAdd={args.onAdd}
        trigger={
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create New Category
          </Button>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Uncontrolled usage with a custom trigger: opening the dialog, filling the form and adding emits the category.',
      },
    },
  },
  play: async ({ canvas, args }) => {
    const trigger = canvas.getByRole('button', { name: 'Create New Category' });
    await storybookExpect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await screen.findByRole('dialog');

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Name' }),
      'Garden',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await waitFor(() =>
      storybookExpect(args.onAdd).toHaveBeenCalledWith(
        storybookExpect.objectContaining({ name: 'Garden' }),
      ),
    );
    await waitFor(() =>
      storybookExpect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  },
};
