import { useTranslations } from 'next-intl';
import DecimalFormField from '@atoms/products/variant/DecimalFormField';

export default function WeightFormField() {
  const t = useTranslations('Products');

  return (
    <section>
      <DecimalFormField
        name="weight"
        label={t('weight')}
        placeholder="2"
        itemClassName="sm:mx-auto sm:w-1/2"
        labelClassName="text-lg font-semibold"
        suffix={
          <span className="text-foreground pointer-events-none absolute inset-y-0 right-3 my-1.5 flex items-center rounded-md border px-2">
            kg
          </span>
        }
      />
    </section>
  );
}
