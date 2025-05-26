import ButtonPlan from '@atoms/confirm-register/ButtonPlan';
import CardPlan from '@atoms/confirm-register/CardPlan';
import { useTranslations } from 'next-intl';

type PlanAdvancedProps = {
  price: string;
  selected: boolean;
  onSelect: () => void;
};

export default function PlanAdvanced({
  price,
  selected,
  onSelect,
}: PlanAdvancedProps) {
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
      <ButtonPlan
        text={t('buttonAdvanced')}
        selected={selected}
        onSelect={onSelect}
      />
    </CardPlan>
  );
}
