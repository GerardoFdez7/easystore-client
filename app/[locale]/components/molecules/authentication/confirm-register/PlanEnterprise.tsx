import CardPlan from '@atoms/authentication/confirm-register/CardPlan';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type PlanEnterpriseProps = {
  price: string;
};

export default function PlanEnterprise({ price }: PlanEnterpriseProps) {
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
        <Link href="/touch">
          <button className="text-title w-fit cursor-pointer border-b-3 border-black text-4xl font-extrabold">
            {t('buttonEnterprise')}
          </button>
        </Link>
      </div>
    </CardPlan>
  );
}
