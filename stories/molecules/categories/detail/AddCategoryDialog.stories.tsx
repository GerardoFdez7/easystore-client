import type { Meta, StoryObj } from '@storybook/nextjs';
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
    onAdd: (category) => {
      console.log('New category added:', category);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default AddCategoryDialog with the standard trigger button. Click the button to open the dialog and create a new category.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCategoryAdd = (category: any) => {
      alert(
        `Category "${category.name}" added successfully!\n\nDetails:\n- Name: ${category.name}\n- Description: ${category.description || 'No description'}\n- Cover: ${category.cover || 'No cover image'}`,
      );
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Try adding a category:</h3>
        <AddCategoryDialog
          onAdd={handleCategoryAdd}
          trigger={
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create New Category
            </Button>
          }
        />
        <p className="text-muted-foreground text-sm">
          Fill out the form and click &quot;Add&quot; to see the category data
          in an alert.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example where you can actually create a category and see the resulting data. This demonstrates the complete workflow of the component.',
      },
    },
  },
};
