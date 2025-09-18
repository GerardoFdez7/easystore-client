'use client';

import { FC, useState, useMemo } from 'react';
import { useDebounce } from '@hooks/utils/useDebounce';
import { Combobox, ComboboxOption } from '@shadcn/ui/combobox';
import { FindWarehousesDocument } from '@graphql/generated';
import { useQuery } from '@apollo/client/react';
import { useTranslations } from 'next-intl';

interface WarehouseComboboxProps {
  value?: string;
  onChange?: (warehouseId: string) => void;
  disabled?: boolean;
  width?: string | number;
}

const WarehouseCombobox: FC<WarehouseComboboxProps> = ({
  value,
  onChange,
  disabled = false,
  width = 300,
}) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, loading } = useQuery(FindWarehousesDocument, {
    variables: { name: debouncedSearch || undefined },
    fetchPolicy: 'cache-and-network',
  });
  const t = useTranslations('Inventory');

  const options: ComboboxOption[] = useMemo(
    () =>
      data?.getAllWarehouses?.warehouses?.map((w) => ({
        value: w.id,
        label: w.name + (w.city ? ` (${w.city})` : ''),
      })) || [],
    [data],
  );

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      placeholder={t('filterByWarehouse')}
      searchPlaceholder={t('searchWarehouses')}
      emptyMessage={loading ? t('loading') : t('noWarehousesFound')}
      width={width}
      serverSide={true}
      onSearchChange={setSearch}
    />
  );
};

WarehouseCombobox.displayName = 'WarehouseCombobox';

export default WarehouseCombobox;
