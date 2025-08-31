import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import UnderConstructionTemplate from '@templates/UnderConstruction';
import { useTranslations } from 'next-intl';

export default function InventoryTemplate() {
  const t = useTranslations('Dashboard');

  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('inventory')}>
        <UnderConstructionTemplate />
      </SidebarLayout>
    </>
  );
}
