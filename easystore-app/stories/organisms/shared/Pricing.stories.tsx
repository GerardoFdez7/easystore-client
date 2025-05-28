import type { Meta, StoryObj } from '@storybook/react';
import Pricing from '@organisms/shared/Pricing';
import { useState } from 'react';

type PlanType = 'basic' | 'premium' | 'advanced' | 'enterprise';

const meta: Meta<typeof Pricing> = {
  title: 'Organisms/Shared/Pricing',
  component: Pricing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Pricing>;

function PricingWrapper({
  selectedPlan = 'basic',
}: {
  selectedPlan?: PlanType;
}) {
  const [plan, setPlan] = useState<PlanType>(selectedPlan);
  return <Pricing selectedPlan={plan} setSelectedPlan={setPlan} />;
}

export const Default: Story = {
  render: () => <PricingWrapper />,
};
