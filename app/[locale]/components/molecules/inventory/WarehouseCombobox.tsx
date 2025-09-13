'use client';

import { FC, useState, useMemo } from 'react';
import { useDebounce } from '@hooks/utils/useDebounce';
import { Combobox, ComboboxOption } from '@shadcn/ui/combobox';
import { FindWarehousesDocument } from '@graphql/generated';
import { useQuery } from '@apollo/client/react';

interface WarehouseComboboxProps {
  value?: string;
  onChange?: (warehouseId: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const WarehouseCombobox: FC<WarehouseComboboxProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, loading } = useQuery(FindWarehousesDocument, {
    variables: { name: debouncedSearch || undefined },
    fetchPolicy: 'cache-and-network',
  });

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
      placeholder={placeholder}
      disabled={disabled}
      searchPlaceholder="Search warehouses..."
      emptyMessage={loading ? 'Loading...' : 'No warehouses found.'}
      width={300}
      serverSide={true}
      onSearchChange={setSearch}
    />
  );
};

WarehouseCombobox.displayName = 'WarehouseCombobox';

export default WarehouseCombobox;
