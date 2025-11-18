import type { Meta, StoryObj } from '@storybook/nextjs';
import BillingMethodCard from '@molecules/billing/BillingMethodCard';
// Storybook provides the app's i18n context; remove local provider/messages

const meta: Meta<typeof BillingMethodCard> = {
  title: 'Molecules/Billing/BillingMethodCard',
  parameters: { layout: 'centered' },
  component: BillingMethodCard,
};
export default meta;

type Story = StoryObj<typeof BillingMethodCard>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <BillingMethodCard
        id="paypal"
        title="PayPal"
        description="Accept payments via PayPal"
        state="pending"
        enabled={true}
        onToggle={() => {}}
        onManage={() => {}}
      />
    </div>
  ),
};
