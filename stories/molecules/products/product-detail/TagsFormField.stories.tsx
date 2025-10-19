import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import TagsFormField from '@molecules/products/product-detail/TagsFormField';
import { mockProductFormData } from '../mocks/productFormMocks';

// Wrapper component that provides form context
const TagsFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: { tags: string[] };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || { tags: [] },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <TagsFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof TagsFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/TagsFormField',
  component: TagsFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field component for adding product tags. Allows multiple tag selection with visual badges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for tags',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: { tags: [] },
  },
};

export const WithTags: Story = {
  args: {
    defaultValues: {
      tags: mockProductFormData.tags,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with multiple tags selected.',
      },
    },
  },
};

export const FewTags: Story = {
  args: {
    defaultValues: {
      tags: ['wireless', 'premium', 'bluetooth'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with a few tags selected.',
      },
    },
  },
};

export const SingleTag: Story = {
  args: {
    defaultValues: {
      tags: ['electronics'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with a single tag.',
      },
    },
  },
};
