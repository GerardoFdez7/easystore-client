import ButtonPlan from '@atoms/authentication/confirm-register/ButtonPlan';
import CardPlan from '@atoms/authentication/confirm-register/CardPlan';
import { useTranslations } from 'next-intl';

type PlanBasicProps = {
  price: string;
  originalPrice?: string;
  selected: boolean;
  onSelect: () => void;
  mode?: 'confirm' | 'landing';
};

export default function PlanBasic({
  price,
  originalPrice,
  selected,
  onSelect,
  mode,
}: PlanBasicProps) {
  const t = useTranslations('ConfirmRegister');

  return (
    <CardPlan
      title={t('basic')}
      price={price}
      originalPrice={originalPrice}
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
        mode={mode}
      />
    </CardPlan>
  );
}
