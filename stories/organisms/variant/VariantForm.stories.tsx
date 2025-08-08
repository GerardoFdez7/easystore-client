import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import VariantForm from '@organisms/variant/VariantForm';

const meta: Meta<typeof VariantForm> = {
  title: 'Organisms/Variant/VariantForm',
  component: VariantForm,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof VariantForm>;

export const Default: Story = { render: () => <VariantForm /> };
