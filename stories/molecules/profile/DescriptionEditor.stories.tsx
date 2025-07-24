import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionEditor } from '@molecules/profile/DescriptionEditor';

const meta: Meta<typeof DescriptionEditor> = {
  component: DescriptionEditor,
  title: 'Molecules/Profile/DescriptionEditor',
};

export default meta;

type Story = StoryObj<typeof DescriptionEditor>;

export const Default: Story = {};
