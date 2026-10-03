import { expect as storybookExpect, screen, userEvent } from 'storybook/test';
import TagSelectFormField from '@molecules/shared/TagSelectFormField';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';
import type { ComponentProps } from 'react';

type TagOption = {
  id: string;
  label: string;
};

type TagFormValues = {
  tags: TagOption[];
};

const DemoTagSelectFormField = TagSelectFormField<TagOption>;
type DemoTagSelectProps = ComponentProps<typeof DemoTagSelectFormField>;

const availableOptions: TagOption[] = [
  { id: 'tag-organic', label: 'Organic' },
  { id: 'tag-local', label: 'Locally made' },
  { id: 'tag-recycled', label: 'Recycled materials' },
];

const defaultArgs: DemoTagSelectProps = {
  name: 'tags',
  label: 'Product tags',
  placeholder: 'Select a tag',
  emptyStateText: 'No tags selected',
  deleteAriaLabel: 'Remove',
  availableOptions,
  getOptionId: (option) => option.id,
  getOptionLabel: (option) => option.label,
};

function TagSelectFixture({ selected }: { selected: TagOption[] }) {
  const form = useForm<TagFormValues>({
    defaultValues: {
      tags: selected,
    },
  });

  return (
    <FormProvider {...form}>
      <form className="w-96">
        <DemoTagSelectFormField {...defaultArgs} />
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof DemoTagSelectFormField> = {
  title: 'Molecules/Shared/TagSelectFormField',
  component: DemoTagSelectFormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: defaultArgs,
  argTypes: {
    name: {
      control: 'text',
      description: 'React Hook Form field name.',
    },
    label: {
      control: 'text',
      description: 'Visible field label.',
    },
    placeholder: {
      control: 'text',
      description: 'Prompt displayed by the select trigger.',
    },
    emptyStateText: {
      control: 'text',
      description: 'Message displayed when no options are selected.',
    },
    availableOptions: {
      control: 'object',
      description: 'Options that can be added to the field.',
    },
    getOptionId: { control: false },
    getOptionLabel: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof DemoTagSelectFormField>;

export const Empty: Story = {
  render: () => <TagSelectFixture selected={[]} />,
  play: async ({ canvas }) => {
    await storybookExpect(
      canvas.getByText('No tags selected'),
    ).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole('combobox', { name: 'Product tags' }),
    );
    await userEvent.click(
      await screen.findByRole('option', { name: 'Locally made' }),
    );

    await storybookExpect(canvas.getByText('Locally made')).toBeInTheDocument();
    await storybookExpect(canvas.queryByText('No tags selected')).toBeNull();
    await storybookExpect(
      canvas.getByRole('button', { name: 'Remove Locally made' }),
    ).toBeInTheDocument();
  },
};

export const SelectedTags: Story = {
  render: () => (
    <TagSelectFixture selected={[availableOptions[0], availableOptions[2]]} />
  ),
  play: async ({ canvas }) => {
    await storybookExpect(canvas.getByText('Organic')).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Recycled materials'),
    ).toBeInTheDocument();
    await storybookExpect(canvas.queryByText('No tags selected')).toBeNull();

    await userEvent.click(
      canvas.getByRole('button', { name: 'Remove Organic' }),
    );
    await storybookExpect(
      canvas.queryByRole('button', { name: 'Remove Organic' }),
    ).toBeNull();
    await storybookExpect(
      canvas.getByText('Recycled materials'),
    ).toBeInTheDocument();
  },
};
