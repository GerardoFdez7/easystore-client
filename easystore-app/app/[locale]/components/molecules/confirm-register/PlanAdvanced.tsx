import CardPlan from '@atoms/confirm-register/CardPlan';
import { Button } from '@atoms/shared/ButtonCn';
import { useTranslations } from 'next-intl';

type PlanAdvancedProps = {
  price: string;
};

export default function PlanAdvanced({ price }: PlanAdvancedProps) {
  const t = useTranslations('ConfirmRegister');
  return (
    <CardPlan
      title={t('advanced')}
      price={price}
      features={[
        t('1featureAdvanced'),
        t('2featureAdvanced'),
        t('3featureAdvanced'),
        t('4featureAdvanced'),
        t('5featureAdvanced'),
        t('6featureAdvanced'),
        t('7featureAdvanced'),
        t('8featureAdvanced'),
        t('9featureAdvanced'),
        t('10featureAdvanced'),
      ]}
    >
      <Button className="py-6" variant={'plans'}>
        {t('buttonAdvanced')}
      </Button>
    </CardPlan>
  );
}
