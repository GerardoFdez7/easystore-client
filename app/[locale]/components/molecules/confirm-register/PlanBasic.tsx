import ButtonPlan from '@atoms/confirm-register/ButtonPlan';
import CardPlan from '@atoms/confirm-register/CardPlan';
import { useTranslations } from 'next-intl';

type PlanBasicProps = {
  price: string;
  selected: boolean;
  onSelect: () => void;
};

export default function PlanBasic({
  price,
  selected,
  onSelect,
}: PlanBasicProps) {
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
      <ButtonPlan
        text={t('buttonBasic')}
        selected={selected}
        onSelect={onSelect}
      />
    </CardPlan>
  );
}
