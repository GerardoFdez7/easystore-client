import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm, FormProvider } from 'react-hook-form';
import ShortLongDescriptionFormField from '@molecules/products/product-detail/ShortLongDescriptionFormField';
import { mockProductFormData } from '../mocks/productFormMocks';

// Wrapper component that provides form context
const ShortLongDescriptionFormFieldWrapper = ({
  defaultValues,
}: {
  defaultValues?: { shortDescription: string; longDescription: string };
}) => {
  const methods = useForm({
    defaultValues: defaultValues || {
      shortDescription: '',
      longDescription: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <ShortLongDescriptionFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof ShortLongDescriptionFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/ShortLongDescriptionFormField',
  component: ShortLongDescriptionFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field component for entering product descriptions. Includes both short (200 chars) and long (2000 chars) description fields with character limits.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValues: {
      description: 'Default form values for descriptions',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {
      shortDescription: '',
      longDescription: '',
    },
  },
};

export const WithValues: Story = {
  args: {
    defaultValues: {
      shortDescription: mockProductFormData.shortDescription,
      longDescription: mockProductFormData.longDescription,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Fields pre-filled with short and long descriptions.',
      },
    },
  },
};

export const ShortDescriptionOnly: Story = {
  args: {
    defaultValues: {
      shortDescription: mockProductFormData.shortDescription,
      longDescription: '',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the short description field has content.',
      },
    },
  },
};

export const LongDescriptionOnly: Story = {
  args: {
    defaultValues: {
      shortDescription: '',
      longDescription: mockProductFormData.longDescription,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the long description field has content.',
      },
    },
  },
};

export const NearCharacterLimit: Story = {
  args: {
    defaultValues: {
      shortDescription: 'A'.repeat(195) + '...',
      longDescription: 'B'.repeat(1995) + '...',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Both fields near their character limits to test validation.',
      },
    },
  },
};
