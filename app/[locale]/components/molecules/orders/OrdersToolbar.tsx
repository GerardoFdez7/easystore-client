'use client';

import ButtonAddOrder from '@atoms/orders/ButtonAddOrder';
import SearchBar from '@atoms/shared/SearchBar';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

interface OrdersToolbarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const OrdersToolbar = memo(function OrdersToolbar({
  searchTerm,
  onSearch,
}: OrdersToolbarProps) {
  const t = useTranslations('Orders');

  return (
    <section className="flex w-full flex-col gap-4">
      {/* Add Order Button */}
      <div className="flex w-full justify-end">
        <ButtonAddOrder />
      </div>

      {/* Search Bar */}
      <div className="flex w-full flex-row gap-2">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearch}
          placeholder={t('searchOrders')}
          className="w-full"
        />
      </div>
    </section>
  );
});
