import type { Meta, StoryObj } from '@storybook/nextjs';
import SkeletonWrapper from '@molecules/shared/SkeletonWrapper';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';

const meta: Meta<typeof SkeletonWrapper> = {
  title: 'Molecules/Shared/SkeletonWrapper',
  component: SkeletonWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description:
        'This component is for wrapping another component, and it will inherit its size and position to show when loading.',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show skeleton (true) or actual content (false).',
      defaultValue: true,
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the skeleton.',
    },
    fallbackHeight: {
      control: 'text',
      description:
        'Default height class when dimensions cant be inferred. @default "h-8"',
      defaultValue: 'h-8',
    },
    fallbackWidth: {
      control: 'text',
      description:
        'Default width class when dimensions cant be inferred. @default "w-full"',
      defaultValue: 'w-full',
    },
  },
  args: {
    loading: true,
  },
};

export default meta;

type Story = StoryObj<typeof SkeletonWrapper>;

export const WithComponent: Story = {
  args: {
    children: <WarehouseCombobox />,
  },
  render: (args) => (
    <>
      <div>Select component loading</div>
      <SkeletonWrapper {...args}>{args.children}</SkeletonWrapper>
    </>
  ),
};

export const CustomDimensions: Story = {
  args: {
    children: <div className="h-32 w-64 rounded-lg bg-blue-200" />,
    fallbackHeight: 'h-32',
    fallbackWidth: 'w-64',
  },
  render: (args) => (
    <SkeletonWrapper {...args}>{args.children}</SkeletonWrapper>
  ),
};
