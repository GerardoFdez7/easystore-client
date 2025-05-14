import CardPlan from '@atoms/confirm-register/CardPlan';
import { Button } from '@atoms/shared/ButtonCn';

type PlanPremiumProps = {
  price: string;
};

export default function PlanPremium({ price }: PlanPremiumProps) {
  return (
    <CardPlan
      title="Premium"
      price={price}
      features={[
        '50 products limit',
        'Priority support',
        'Access to beta features',
        'Access to beta features',
      ]}
    >
      <Button className="py-6" variant={'plans'}>
        Get started
      </Button>
    </CardPlan>
  );
}
