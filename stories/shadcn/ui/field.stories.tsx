import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@shadcn/ui/field';
import { Input } from '@shadcn/ui/input';

const meta = {
  title: 'Shadcn/UI/Field',
  component: Field,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileFields: Story = {
  render: () => (
    <FieldSet className="w-96">
      <FieldLegend>Store profile</FieldLegend>
      <FieldDescription>
        These details appear in customer communications.
      </FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="store-name">Store name</FieldLabel>
          <Input id="store-name" defaultValue="EasyStore Market" />
          <FieldDescription>
            Use the public name of your store.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="support-email">Support email</FieldLabel>
          <Input
            id="support-email"
            type="email"
            defaultValue="support@example.com"
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByLabelText('Store name')).toHaveValue(
      'EasyStore Market',
    );
    await storybookExpect(canvas.getByLabelText('Support email')).toHaveValue(
      'support@example.com',
    );
  },
};

export const Invalid: Story = {
  render: () => (
    <Field data-invalid className="w-96">
      <FieldLabel htmlFor="invalid-store-name">Store name</FieldLabel>
      <Input id="invalid-store-name" aria-invalid defaultValue="E" />
      <FieldError>Store name must contain at least two characters.</FieldError>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByLabelText('Store name')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await storybookExpect(canvas.getByRole('alert')).toHaveTextContent(
      'Store name must contain at least two characters.',
    );
  },
};
