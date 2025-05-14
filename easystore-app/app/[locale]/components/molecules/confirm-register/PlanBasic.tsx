import CardPlan from '@atoms/confirm-register/CardPlan';
import { Button } from '@atoms/shared/ButtonCn';

export default function PlanBasic() {
  return (
    <CardPlan
      title="Basic"
      price="$0"
      features={[
        '50 products limit',
        'Priority support',
        'Access to beta features',
        'Access to beta features',
      ]}
    >
      <Button className="py-6" variant={'plans'}>
        try for free
      </Button>
    </CardPlan>
  );
}
