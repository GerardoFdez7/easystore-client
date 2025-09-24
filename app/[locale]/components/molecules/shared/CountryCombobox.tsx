'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Combobox } from '@shadcn/ui/combobox';
import { useCountryCombobox } from '@hooks/domains/address/geo/useCountryCombobox';

interface CountryComboboxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  options?: { label: string; value: string }[];
  loading?: boolean;
}

export default function CountryCombobox({
  value,
  onValueChange,
  placeholder,
  className,
  disabled = false,
  options: propOptions,
  loading: propLoading,
}: CountryComboboxProps) {
  const t = useTranslations('Inventory.WarehouseManagement');

  const { options, loading, updateSearchTerm } = useCountryCombobox();

  const currentOptions = propOptions || options;
  const currentLoading = propLoading || loading;

  return (
    <Combobox
      options={currentOptions}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder || t('selectCountry')}
      searchPlaceholder={t('searchCountry')}
      emptyMessage={currentLoading ? t('loading') : t('noCountryFound')}
      className={className}
      disabled={disabled || currentLoading}
      serverSide={true}
      width={'100%'}
      onSearchChange={updateSearchTerm}
    />
  );
}
