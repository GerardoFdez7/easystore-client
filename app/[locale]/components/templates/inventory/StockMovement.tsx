import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainStockMovement from '@organisms/inventory/stock-movement/MainStockMovement';
import { useTranslations } from 'next-intl';

export default function StockMovementTemplate() {
  const t = useTranslations('StockMovement');

  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('title')}>
        <MainStockMovement />
      </SidebarLayout>
    </>
  );
}
