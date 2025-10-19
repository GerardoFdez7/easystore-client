import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import MediaFormField from '@molecules/products/product-detail/MediaFormField';

// Wrapper component that provides form context
const MediaFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: { cover: string; media: string[] };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || { cover: '', media: [] },
  });

  // Reset form with new values when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <MediaFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof MediaFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/MediaFormField',
  component: MediaFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field component for uploading and managing product media (images and videos). Supports multiple files with cover image selection and media gallery. Features drag-and-drop, preview, and reordering capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for cover and media',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: { cover: '', media: [] },
  },
};

export const WithCoverOnly: Story = {
  args: {
    defaultValues: {
      cover: '/default.webp',
      media: [],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with only a cover image, no additional gallery media.',
      },
    },
  },
};
