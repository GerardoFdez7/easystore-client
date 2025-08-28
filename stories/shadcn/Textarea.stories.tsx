import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@shadcn/ui/textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Shadcn/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    'aria-invalid': {
      control: 'boolean',
      description:
        'Activa estilos de error por medio del atributo aria-invalid',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Write something…',
    rows: 4,
    className: 'w-[420px]',
  },
};

export const WithSelectionStyles: Story = {
  args: {
    placeholder: 'Try selecting this text…',
    rows: 4,
    className:
      'w-[420px] selection:bg-blue-200 selection:text-blue-950 placeholder:text-slate-400',
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'This field has an error…',
    rows: 4,
    className: 'w-[420px]',
    'aria-invalid': true,
  } as React.ComponentProps<typeof Textarea>,
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    rows: 4,
    disabled: true,
    className: 'w-[420px]',
  },
};
