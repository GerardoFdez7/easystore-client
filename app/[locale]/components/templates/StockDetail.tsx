import { useTranslations } from 'next-intl';
import React from 'react';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainStockDetail from '@organisms/inventory/stock-detail/MainStockDetail';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';

interface InventoryTemplateProps {
  warehouseSku: string;
}

export default function StockDetailTemplate({
  warehouseSku,
}: InventoryTemplateProps) {
  const t = useTranslations('StockDetail');
  let warehouseName: string;
  let sku: string;
  if (warehouseSku.includes('_')) {
    [warehouseName, sku] = warehouseSku.split('_');
  } else {
    warehouseName = warehouseSku;
    sku = '';
  }
  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('stockDetail')}>
        <MainStockDetail warehouseName={warehouseName} sku={sku} />
      </SidebarLayout>
    </>
  );
}
