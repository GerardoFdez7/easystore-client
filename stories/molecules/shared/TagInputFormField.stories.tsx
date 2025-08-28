import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';
import TagInputFormField from '@molecules/shared/TagInputFormField';

const meta: Meta<typeof TagInputFormField> = {
  title: 'Molecules/Shared/TagInputFormField',
  component: TagInputFormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const methods = useForm({
        defaultValues: {
          tags: [],
          skills: [],
          categories: [],
        },
      });

      return (
        <FormProvider {...methods}>
          <div className="w-96">
            <Story />
          </div>
        </FormProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'tags',
    label: 'Tags',
    placeholder: 'Enter a tag...',
    addButtonText: 'Add Tag',
    emptyStateText: 'No tags added yet',
    deleteAriaLabel: 'Delete tag',
  },
};

export const Skills: Story = {
  args: {
    name: 'skills',
    label: 'Skills',
    placeholder: 'Enter a skill...',
    addButtonText: 'Add Skill',
    emptyStateText: 'No skills added yet',
    deleteAriaLabel: 'Remove skill',
  },
};

export const Categories: Story = {
  args: {
    name: 'categories',
    label: 'Product Categories',
    placeholder: 'Enter a category...',
    addButtonText: 'Add Category',
    emptyStateText: 'No categories selected',
    deleteAriaLabel: 'Remove category',
    inputClassName: 'w-80',
    tagClassName:
      'bg-blue-50 border-blue-200 flex items-center gap-1 rounded-lg px-3 py-2',
  },
};

export const CustomStyling: Story = {
  args: {
    name: 'tags',
    label: 'Custom Styled Tags',
    placeholder: 'Add custom tag...',
    addButtonText: 'Add',
    emptyStateText: 'Start adding some tags!',
    deleteAriaLabel: 'Delete',
    inputClassName: 'w-72 border-2 border-purple-300 focus:border-purple-500',
    tagClassName:
      'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 flex items-center gap-1 rounded-full px-4 py-2',
    containerClassName: 'space-y-4',
  },
};
