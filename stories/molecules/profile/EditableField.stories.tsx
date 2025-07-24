import type { Meta, StoryObj } from '@storybook/react';
import { EditableField } from '@molecules/profile/EditableField';

const meta: Meta<typeof EditableField> = {
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
