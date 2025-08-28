import MainVariant from '@organisms/variant/MainVariant';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import { useTranslations } from 'next-intl';

export default function VariantTemplate() {
  const t = useTranslations('Variant');
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={t('welcomeVariant')}>
        <MainVariant />
      </SidebarLayout>
    </div>
  );
}
