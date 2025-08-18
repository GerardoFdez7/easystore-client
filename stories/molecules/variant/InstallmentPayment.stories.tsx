import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import InstallmentPayments, {
  Installment,
} from '@molecules/variant/InstallmentPayment';

const meta: Meta<typeof InstallmentPayments> = {
  title: 'Molecules/Variant/InstallmentPayments',
  component: InstallmentPayments,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof InstallmentPayments>;

const t = (k: string) =>
  (
    ({
      installmentPayments: 'Installment payments',
      months: 'Months',
      monthsPlaceholder: 'e.g., 12',
      interestRate: 'Interest rate',
      interestRatePlaceholder: 'e.g., 18',
    }) as Record<string, string>
  )[k] ?? k;

function Demo() {
  const [installment, setInstallment] = React.useState<Installment>({
    months: '',
    interestRate: '',
  });
  return (
    <div className="w-[720px]">
      <InstallmentPayments
        t={t}
        installment={installment}
        setInstallment={setInstallment}
      />
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };
