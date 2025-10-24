import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import { useTranslations } from 'next-intl';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainOrderDetail from '@organisms/orders/detail/MainOrderDetail';

interface OrderDetailTemplateProps {
  param?: string;
}
export default function OrderDetailTemplate({
  param,
}: OrderDetailTemplateProps) {
  const t = useTranslations('Orders');

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={t('orders')}>
        <MainOrderDetail param={param ?? ''} />
      </SidebarLayout>
    </div>
  );
}
