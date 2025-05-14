import HeaderPlan from '@atoms/confirm-register/HeaderPlan';
import LiPlan from '@atoms/confirm-register/LiPlan';

type CardPlanProps = {
  title: string;
  price: string;
  features: string[];
  children?: React.ReactNode;
};

export default function CardPlan({
  title,
  price,
  features,
  children,
}: CardPlanProps) {
  return (
    <div className="flex h-[466px] w-[360px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex-1">
        <HeaderPlan title={title} price={price} />
        <ul className="mb-8 space-y-1.5">
          {features.map((feature, index) => (
            <LiPlan key={index} text={feature} />
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
}
