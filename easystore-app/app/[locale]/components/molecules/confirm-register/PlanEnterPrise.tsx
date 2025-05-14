import CardPlan from '@atoms/confirm-register/CardPlan';

type PlanEnterPriseProps = {
  price: string;
};

export default function PlanEnterPrise({ price }: PlanEnterPriseProps) {
  return (
    <CardPlan
      title="Enterprise"
      price={price}
      features={[
        '50 products limit',
        'Priority support',
        'Access to beta features',
        'Access to beta features',
      ]}
    >
      <div className="flex justify-center">
        <button className="text-title w-fit border-b-3 border-black text-4xl font-extrabold">
          Get in touch
        </button>
      </div>
    </CardPlan>
  );
}
