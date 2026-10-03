import { expect as storybookExpect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Pricing from '@organisms/shared/Pricing';
import { useState } from 'react';

type PlanType = 'basic' | 'premium' | 'advanced' | 'enterprise';

const meta: Meta<typeof Pricing> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const monthly = canvas.getByRole('tab', { name: 'Monthly' });
    const yearly = canvas.getByRole('tab', { name: 'Yearly' });
    await storybookExpect(monthly).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(yearly);
    await storybookExpect(yearly).toHaveAttribute('aria-selected', 'true');
    await storybookExpect(monthly).toHaveAttribute('aria-selected', 'false');
  },
  title: 'Organisms/Shared/Pricing',
  component: Pricing,
  parameters: {
    layout: 'fullscreen',
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
