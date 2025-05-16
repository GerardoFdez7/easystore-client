import CardPlan from '@atoms/confirm-register/CardPlan';
import { Button } from '@atoms/shared/ButtonCn';
import { useTranslations } from 'next-intl';

type PlanBasicProps = {
  price: string;
};

export default function PlanBasic({ price }: PlanBasicProps) {
  const t = useTranslations('ConfirmRegister');

  return (
    <CardPlan
      title={t('basic')}
      price={price}
      features={[
        t('1featureBasic'),
        t('2featureBasic'),
        t('3featureBasic'),
        t('4featureBasic'),
      ]}
    >
      <Button className="py-6" variant={'plans'}>
        {t('buttonBasic')}
      </Button>
    </CardPlan>
  );
}
