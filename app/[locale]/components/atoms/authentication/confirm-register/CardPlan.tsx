import HeaderPlan from '@atoms/authentication/confirm-register/HeaderPlan';
import LiPlan from '@atoms/authentication/confirm-register/LiPlan';
import { useTranslations } from 'next-intl';
import { cn } from 'utils';

type CardPlanProps = {
  title: string;
  price: string;
  from?: string;
  originalPrice?: string;
  highlighted?: boolean;
  features: string[];
  children?: React.ReactNode;
};

export default function CardPlan({
  title,
  price,
  from,
  originalPrice,
  highlighted,
  features,
  children,
}: CardPlanProps) {
  const t = useTranslations('ConfirmRegister');

  return (
    <section
      className={cn(
        'bg-card relative flex h-116.5 w-xs flex-col justify-between rounded-lg border p-6 shadow-sm lg:w-100 2xl:w-80',
        highlighted &&
          'border-primary shadow-primary/40 ring-primary/15 border-2 shadow-2xl ring-4 min-[904px]:-translate-y-3',
      )}
    >
      {highlighted && (
        <span className="bg-primary absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold whitespace-nowrap text-white">
          {t('recommended')}
        </span>
      )}
      <div className="flex-1">
        <HeaderPlan
          title={title}
          price={price}
          from={from}
          originalPrice={originalPrice}
        />
        <ul className="mb-8 space-y-1.5">
          {features.map((feature, index) => (
            <LiPlan key={index} text={feature} />
          ))}
        </ul>
      </div>
      {children}
    </section>
  );
}
