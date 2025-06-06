import ButtonPlan from '@atoms/confirm-register/ButtonPlan';
import CardPlan from '@atoms/confirm-register/CardPlan';
import { useTranslations } from 'next-intl';

type PlanPremiumProps = {
  price: string;
  selected: boolean;
  onSelect: () => void;
};

export default function PlanPremium({
  price,
  selected,
  onSelect,
}: PlanPremiumProps) {
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
      <ButtonPlan
        text={t('buttonPremium')}
        selected={selected}
        onSelect={onSelect}
      />
    </CardPlan>
  );
}
