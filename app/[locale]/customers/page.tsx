import SidebarLayout from '@organisms/shared/SidebarLayout';
import UnderConstructionTemplate from '@templates/UnderConstruction';
import HeaderDashboard from '@organisms/dashboard/HeaderDashboard';
import { useTranslations } from 'next-intl';

export default function CustomersPage() {
  const t = useTranslations('Dashboard');

  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('customers')}>
        <UnderConstructionTemplate />
      </SidebarLayout>
    </>
  );
}
