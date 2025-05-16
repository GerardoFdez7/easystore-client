import CardPlan from '@atoms/confirm-register/CardPlan';
import { Button } from '@atoms/shared/ButtonCn';
import { useTranslations } from 'next-intl';

type PlanPremiumProps = {
  price: string;
};

export default function PlanPremium({ price }: PlanPremiumProps) {
  const t = useTranslations('ConfirmRegister');

  return (
    <CardPlan
      title={t('premium')}
      price={price}
      features={[
        t('1featurePremium'),
        t('2featurePremium'),
        t('3featurePremium'),
        t('4featurePremium'),
        t('5featurePremium'),
        t('6featurePremium'),
        t('7featurePremium'),
        t('8featurePremium'),
        t('9featurePremium'),
      ]}
    >
      <Button className="py-6" variant={'plans'}>
        {t('buttonPremium')}
      </Button>
    </CardPlan>
  );
}
