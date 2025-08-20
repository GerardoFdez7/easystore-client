import UnderConstructionTemplate from '@templates/UnderConstruction';
import HeaderDashboard from '@organisms/dashboard/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import { useTranslations } from 'next-intl';

export default function PreviewPage() {
  const t = useTranslations('Dashboard');

  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('preview')}>
        <UnderConstructionTemplate />
      </SidebarLayout>
    </>
  );
}
