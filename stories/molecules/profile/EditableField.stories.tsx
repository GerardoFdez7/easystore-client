import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EditableField } from '@molecules/profile/EditableField';

const meta: Meta<typeof EditableField> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByRole('textbox')).toBeInTheDocument();
  },
  component: EditableField,
  title: 'Molecules/Profile/EditableField',
  args: {
    label: 'Email',
    value: 'test@example.com',
  },
};

export default meta;

type Story = StoryObj<typeof EditableField>;

export const Default: Story = {};
