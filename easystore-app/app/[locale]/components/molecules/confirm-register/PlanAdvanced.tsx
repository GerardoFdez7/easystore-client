import CardPlan from '@atoms/confirm-register/CardPlan';
import { Button } from '@atoms/shared/ButtonCn';

type PlanAdvancedProps = {
  price: string;
};

export default function PlanAdvanced({ price }: PlanAdvancedProps) {
  return (
    <CardPlan
      title="Advanced"
      price={price}
      features={[
        '50 products limit',
        'Priority support',
        'Access to beta features',
        'Access to beta features',
      ]}
    >
      <Button className="py-6" variant={'plans'}>
        14 days trial
      </Button>
    </CardPlan>
  );
}
