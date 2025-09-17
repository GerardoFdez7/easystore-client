import type { Meta, StoryObj } from '@storybook/react';
import Sustainability from '@molecules/product-detail/SustainabilityFormField';

const meta: Meta<typeof Sustainability> = {
  title: 'Molecules/Product Detail/Sustainability',
  component: Sustainability,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Sustainability sustainabilities={[]} />
    </div>
  ),
};
