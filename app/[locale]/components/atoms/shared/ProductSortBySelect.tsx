import { useTranslations } from 'next-intl';
import SortByControl from '@atoms/shared/SortByControl';
import { ProductSortBy } from '@lib/types/product';

type ProductSortBySelectProps = {
  value?: ProductSortBy | null;
  onChange: (value: ProductSortBy | null) => void;
  className?: string;
  availableOptions?: ProductSortBy[];
};

export default function ProductSortBySelect({
  value,
  onChange,
  className,
  availableOptions,
}: ProductSortBySelectProps) {
  const t = useTranslations('Shared');

  const allOptions = [
    { value: ProductSortBy.Name, label: t('sortBy.name') },
    { value: ProductSortBy.CreatedAt, label: t('sortBy.createdAt') },
    { value: ProductSortBy.UpdatedAt, label: t('sortBy.updatedAt') },
    { value: ProductSortBy.Sku, label: t('sortBy.sku') },
    {
      value: ProductSortBy.FirstVariantPrice,
      label: t('sortBy.firstVariantPrice'),
    },
    { value: ProductSortBy.VariantCount, label: t('sortBy.variantCount') },
  ];

  const options = availableOptions
    ? allOptions.filter((option) => availableOptions.includes(option.value))
    : allOptions;

  return (
    <SortByControl
      className={className}
      defaultValue={ProductSortBy.UpdatedAt}
      onChange={onChange}
      options={options}
      placeholder={t('sortBy.placeholder')}
      value={value ?? undefined}
    />
  );
}
