import React from 'react';
import { useTranslations } from 'next-intl';
import TagInputFormField from '../../shared/TagInputFormField';

export default function PersonalizationOptionsFormField() {
  const t = useTranslations('Variant');

  return (
    <TagInputFormField
      name="personalizationOptions"
      label={t('personalizationOptions')}
      placeholder={t('personalizationPlaceholder')}
      addButtonText={t('addPersonalization')}
      emptyStateText={t('noPersonalizations')}
      deleteAriaLabel={t('delete') ?? 'Delete'}
    />
  );
}
