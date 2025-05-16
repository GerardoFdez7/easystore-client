import CardPlan from '@atoms/confirm-register/CardPlan';
import { useTranslations } from 'next-intl';

type PlanEnterPriseProps = {
  price: string;
};

export default function PlanEnterPrise({ price }: PlanEnterPriseProps) {
  const t = useTranslations('ConfirmRegister');

  return (
    <CardPlan
      title={t('enterprise')}
      from={t('from')}
      price={price}
      features={[
        t('1featureEnterprise'),
        t('2featureEnterprise'),
        t('3featureEnterprise'),
        t('4featureEnterprise'),
        t('5featureEnterprise'),
        t('6featureEnterprise'),
        t('7featureEnterprise'),
        t('8featureEnterprise'),
        t('9featureEnterprise'),
      ]}
    >
      <div className="flex justify-center">
        <button className="text-title w-fit border-b-3 border-black text-4xl font-extrabold">
          {t('buttonEnterprise')}
        </button>
      </div>
    </CardPlan>
  );
}
