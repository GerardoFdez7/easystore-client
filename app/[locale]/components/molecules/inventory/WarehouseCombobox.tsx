import { Combobox } from '@shadcn/ui/combobox';
import { useTranslations } from 'next-intl';
import { useWarehouseCombobox } from '@hooks/domains/inventory';
import { cn } from 'utils';
import { useEffect, useCallback } from 'react';

interface WarehouseComboboxProps {
  value?: string;
  onChange?: (warehouseId: string) => void;
  onChangeDetailed?: (w: { id: string; name: string }) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  autoSelectFirst?: boolean;
}

const WarehouseCombobox: React.FC<WarehouseComboboxProps> = ({
  value,
  onChange,
  onChangeDetailed,
  disabled = false,
  placeholder,
  className,
  autoSelectFirst = false,
}) => {
  const t = useTranslations('Inventory');

  const {
    options,
    warehouses,
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

  const handleValueChange = useCallback(
    (val?: string) => {
      onChange?.(val ?? '');
      if (onChangeDetailed) {
        const w = warehouses.find((wh) => wh.id === val);
        onChangeDetailed({
          id: val ?? '',
          name: (w?.name ?? '').trim(),
        });
      }
    },
    [onChange, onChangeDetailed, warehouses],
  );

  // Auto-select first option when requested and no value is set yet
  useEffect(() => {
    if (autoSelectFirst && !value && options.length > 0) {
      handleValueChange(options[0].value);
    }
  }, [autoSelectFirst, value, options, handleValueChange]);

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={handleValueChange}
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
