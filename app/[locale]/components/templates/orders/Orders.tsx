import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import { useTranslations } from 'next-intl';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainOrder from '@organisms/orders/MainOrder';

export default function OrdersTemplate() {
  const t = useTranslations('Orders');

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={t('orders')}>
        <MainOrder />
      </SidebarLayout>
    </div>
  );
}
