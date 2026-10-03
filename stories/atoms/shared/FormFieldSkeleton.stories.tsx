import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FormFieldSkeleton from '@atoms/shared/FormFieldSkeleton';

const meta: Meta<typeof FormFieldSkeleton> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      canvas.getByRole('status', { name: 'Loading form field' }),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Shared/FormFieldSkeleton',
  component: FormFieldSkeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    labelWidth: { control: 'text' },
    inputHeight: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div className="w-180 rounded-xl border p-6 shadow-sm">
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
  play: async ({ canvasElement }) => {
    await storybookExpect(
      within(canvasElement).getAllByRole('status', {
        name: 'Loading form field',
      }),
    ).toHaveLength(3);
  },
};
