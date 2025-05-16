import { useTranslations } from 'next-intl';

type HeaderPlanProps = {
  title: string;
  price: string;
  from?: string;
};

export default function HeaderPlan({ title, price, from }: HeaderPlanProps) {
  const t = useTranslations('ConfirmRegister');

  return (
    <div className="mb-4">
      <h3 className="text-title font-bold">{title}</h3>
      <h3 className="text-title font-bold">{from}</h3>
      <div className="flex items-baseline">
        <span className="text-title text-4xl font-extrabold">{price}</span>
        <span className="text-title ml-1 font-bold">{t('month')}</span>
      </div>
    </div>
  );
}
