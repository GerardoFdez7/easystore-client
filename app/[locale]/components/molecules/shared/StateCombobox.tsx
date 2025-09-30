'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Combobox } from '@shadcn/ui/combobox';
import { useStateCombobox } from '@hooks/domains/address/geo';

interface StateComboboxProps {
  countryId?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  width?: string | number;
  options?: { label: string; value: string }[];
  loading?: boolean;
  error?: string;
}

export default function StateCombobox({
  countryId,
  value,
  onValueChange,
  placeholder,
  className,
  disabled = false,
  options: propOptions,
  loading: propLoading,
}: StateComboboxProps) {
  const t = useTranslations('Inventory.WarehouseManagement');

  const {
    options: hookOptions,
    loading: hookLoading,
    updateSearchTerm,
    enabled,
  } = useStateCombobox({
    countryId,
  });

  const options = propOptions || hookOptions;
  const loading = propLoading || hookLoading;

  // Determine if the combobox should be disabled
  const isDisabled = disabled || loading || !enabled;

  // Show appropriate placeholder and empty message based on state
  const placeholderText = !enabled
    ? t('selectCountryFirst')
    : placeholder || t('selectState');

  const emptyMessageText = !enabled
    ? t('selectCountryFirst')
    : loading
      ? t('loading')
      : t('noStateFound');

  return (
    <Combobox
      options={options}
      value={enabled ? value : ''}
      onValueChange={enabled ? onValueChange : () => {}}
      placeholder={placeholderText}
      searchPlaceholder={t('searchState')}
      emptyMessage={emptyMessageText}
      className={className}
      disabled={isDisabled}
      serverSide={true}
      onSearchChange={enabled ? updateSearchTerm : () => {}}
    />
  );
}
