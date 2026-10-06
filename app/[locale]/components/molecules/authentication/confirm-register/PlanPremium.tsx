import ButtonPlan from '@atoms/authentication/confirm-register/ButtonPlan';
import CardPlan from '@atoms/authentication/confirm-register/CardPlan';
import { useTranslations } from 'next-intl';

type PlanPremiumProps = {
  price: string;
  originalPrice?: string;
  selected: boolean;
  onSelect: () => void;
  mode?: 'confirm' | 'landing';
};

export default function PlanPremium({
  price,
  originalPrice,
  selected,
  onSelect,
  mode,
}: PlanPremiumProps) {
  const t = useTranslations('ConfirmRegister');

  return (
    <CardPlan
      title={t('premium')}
      price={price}
      originalPrice={originalPrice}
      features={[
        t('1featurePremium'),
        t('2featurePremium'),
        t('3featurePremium'),
        t('6featurePremium'),
        t('7featurePremium'),
      ]}
    >
      <ButtonPlan
        text={t('buttonPremium')}
        selected={selected}
        onSelect={onSelect}
        mode={mode}
      />
    </CardPlan>
  );
}
