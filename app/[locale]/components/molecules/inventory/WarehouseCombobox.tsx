import { Combobox } from '@shadcn/ui/combobox';
import { useTranslations } from 'next-intl';
import { useWarehouseCombobox } from '@hooks/domains/inventory';
import { cn } from 'utils';

interface WarehouseComboboxProps {
  value?: string;
  onChange?: (warehouseId: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const WarehouseCombobox: React.FC<WarehouseComboboxProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder,
  className,
}) => {
  const t = useTranslations('Inventory');

  const {
    options,
    updateSearchTerm,
    isInitialLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useWarehouseCombobox();

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      void loadMore();
    }
  };

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      placeholder={placeholder || t('filterByWarehouse')}
      searchPlaceholder={t('searchWarehouses')}
      emptyMessage={isInitialLoading ? t('loading') : t('noWarehousesFound')}
      serverSide={true}
      onSearchChange={updateSearchTerm}
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
      onLoadMore={handleLoadMore}
      className={cn('sm:w-70', className)}
    />
  );
};

WarehouseCombobox.displayName = 'WarehouseCombobox';

export default WarehouseCombobox;
