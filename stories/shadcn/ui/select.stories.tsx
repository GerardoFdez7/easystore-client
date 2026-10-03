import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@shadcn/ui/select';

const meta: Meta<typeof Select> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('combobox')).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Select',
  tags: ['autodocs'],
  component: Select,
  subcomponents: {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', { name: 'Language' });
    await storybookExpect(trigger).toHaveTextContent('Spanish');
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(await body.findByRole('option', { name: 'English' }));
    await storybookExpect(trigger).toHaveTextContent('English');
  },
  render: () => (
    <Select defaultValue="es">
      <SelectTrigger className="w-56" aria-label="Language">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="es">Spanish</SelectItem>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="pt">Portuguese</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger className="w-56" aria-label="Fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tropical</SelectLabel>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="mango">Mango</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Berries</SelectLabel>
          <SelectItem value="strawberry">Strawberry</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

const SelectControlledExample: React.FC = () => {
  const [value, setValue] = React.useState('ch');

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-64" aria-label="Country">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gt">Guatemala</SelectItem>
          <SelectItem value="mx">México</SelectItem>
          <SelectItem value="ch">Chile</SelectItem>
        </SelectContent>
      </Select>
      <div className="text-sm">
        Selected: <b>{value}</b>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <SelectControlledExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', { name: 'Country' });
    await storybookExpect(canvas.getByText('ch')).toBeVisible();
    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      await body.findByRole('option', { name: 'Guatemala' }),
    );
    await storybookExpect(canvas.getByText('gt')).toBeVisible();
    await storybookExpect(trigger).toHaveTextContent('Guatemala');
  },
};

export const SmallTrigger: Story = {
  render: () => (
    <Select defaultValue="sm">
      <SelectTrigger className="w-48" size="sm" aria-label="Size">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sm">Small</SelectItem>
        <SelectItem value="md">Medium</SelectItem>
        <SelectItem value="lg">Large</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('combobox', { name: 'Disabled select' }),
    ).toBeDisabled();
  },
  render: () => (
    <Select defaultValue="a" disabled>
      <SelectTrigger className="w-56" aria-label="Disabled select">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  ),
};
