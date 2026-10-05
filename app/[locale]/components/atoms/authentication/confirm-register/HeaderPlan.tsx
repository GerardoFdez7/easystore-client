import { useTranslations } from 'next-intl';

type HeaderPlanProps = {
  title: string;
  price: string;
  from?: string;
  originalPrice?: string;
};

export default function HeaderPlan({
  title,
  price,
  from,
  originalPrice,
}: HeaderPlanProps) {
  const t = useTranslations('ConfirmRegister');

  return (
    <div className="mb-4">
      <h3 className="text-title font-bold">{title}</h3>
      {from && <p className="text-title font-bold">{from}</p>}
      <div className="flex items-baseline">
        {originalPrice && (
          <s className="text-muted-foreground mr-2 text-xl font-semibold">
            {originalPrice}
          </s>
        )}
        <span className="text-title text-5xl font-extrabold">{price}</span>
        <span className="text-title ml-1 font-bold">{t('month')}</span>
      </div>
    </div>
  );
}
