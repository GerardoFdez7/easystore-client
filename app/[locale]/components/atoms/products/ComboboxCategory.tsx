import { Combobox } from '@shadcn/ui/combobox';
import { useTranslations } from 'next-intl';
import { useCategoryCombobox } from '@hooks/domains/category';
import { cn } from 'utils';

type ComboboxCategoryProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function ComboboxCategory({
  value,
  onValueChange,
  className,
  disabled,
}: ComboboxCategoryProps) {
  const t = useTranslations('Products');

  const { options, updateSearchTerm, isLoadingMore, hasMore, loadMore } =
    useCategoryCombobox();

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      void loadMore();
    }
  };

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      placeholder={t('category')}
      searchPlaceholder={t('search')}
      emptyMessage={t('noCategoryFound')}
      serverSide={true}
      onSearchChange={updateSearchTerm}
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
      onLoadMore={handleLoadMore}
      className={cn('sm:w-70', className)}
    />
  );
}
