import type { Meta, StoryObj } from '@storybook/nextjs';
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
  title: 'shadcn/Select',
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
    (Story) => (
      <div style={{ padding: 24 }}>
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
  render: () => (
    <Select defaultValue="es">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="es">Spanish</SelectItem>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">French</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger className="w-56">
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
        <SelectTrigger className="w-64">
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
};

export const SmallTrigger: Story = {
  render: () => (
    <Select defaultValue="sm">
      <SelectTrigger className="w-48" size="sm">
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
  render: () => (
    <Select defaultValue="a" disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  ),
};
