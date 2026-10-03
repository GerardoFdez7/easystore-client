import { useTranslations } from 'next-intl';
import SortByControl from '@atoms/shared/SortByControl';
import { SortBy } from '@lib/types/sort';

type SortBySelectProps = {
  value?: SortBy | null;
  onChange: (value: SortBy | null) => void;
  className?: string;
  availableOptions?: SortBy[];
};

export default function SortBySelect({
  value,
  onChange,
  className,
  availableOptions,
}: SortBySelectProps) {
  const t = useTranslations('Shared');

  const allOptions = [
    { value: SortBy.Name, label: t('sortBy.name') },
    { value: SortBy.CreatedAt, label: t('sortBy.createdAt') },
    { value: SortBy.UpdatedAt, label: t('sortBy.updatedAt') },
  ];

  const options = availableOptions
    ? allOptions.filter((option) => availableOptions.includes(option.value))
    : allOptions;

  return (
    <SortByControl
      className={className}
      defaultValue={SortBy.Name}
      onChange={onChange}
      options={options}
      placeholder={t('sortBy.placeholder')}
      value={value ?? undefined}
    />
  );
}
