import UnderConstructionTemplate from '@templates/UnderConstruction';
import HeaderDashboard from '@organisms/dashboard/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const t = useTranslations('Dashboard');

  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('products')}>
        <UnderConstructionTemplate />
      </SidebarLayout>
    </>
  );
}
