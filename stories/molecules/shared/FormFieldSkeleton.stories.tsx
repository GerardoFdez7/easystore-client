import type { Meta, StoryObj } from '@storybook/nextjs';
import FormFieldSkeleton from '@molecules/shared/FormFieldSkeleton';

const meta: Meta<typeof FormFieldSkeleton> = {
  title: 'Molecules/Shared/FormFieldSkeleton',
  component: FormFieldSkeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    labelWidth: { control: 'text' },
    inputHeight: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div className="w-[720px] rounded-xl border bg-white p-6 shadow-sm">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof FormFieldSkeleton>;

export const Default: Story = {
  args: { labelWidth: 'w-28', inputHeight: 40 },
};

export const Compact: Story = {
  args: { labelWidth: 'w-24', inputHeight: 32 },
};

export const ThreeRows: Story = {
  render: () => (
    <>
      <FormFieldSkeleton />
      <FormFieldSkeleton />
      <FormFieldSkeleton />
    </>
  ),
};
