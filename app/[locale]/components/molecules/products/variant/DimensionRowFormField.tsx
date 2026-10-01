import React from 'react';
import { FormLabel } from '@shadcn/ui/form';
import { useTranslations } from 'next-intl';
import DecimalFormField from '@atoms/products/variant/DecimalFormField';

export default function DimensionsRowFormField() {
  const t = useTranslations('Variant');

  return (
    <section>
      <FormLabel className="text-lg font-semibold">{t('dimension')}</FormLabel>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DecimalFormField
          name="dimensions.height"
          label={t('height')}
          placeholder={t('heightPlaceholder')}
        />
        <DecimalFormField
          name="dimensions.width"
          label={t('width')}
          placeholder={t('widthPlaceholder')}
          type="number"
        />
        <DecimalFormField
          name="dimensions.length"
          label={t('length')}
          placeholder={t('lengthPlaceholder')}
          type="number"
        />
      </div>
    </section>
  );
}
