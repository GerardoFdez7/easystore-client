import TagInputFormField from '@molecules/shared/TagInputFormField';
import { useTranslations } from 'next-intl';

export default function TagsFormField() {
  const t = useTranslations('Products');
  return (
    <TagInputFormField
      name="tags"
      label={t('tags')}
      placeholder={t('tagsPlaceholder')}
      addButtonText="Add tag"
      emptyStateText="No tags added"
      deleteAriaLabel={'Delete'}
    />
  );
}
