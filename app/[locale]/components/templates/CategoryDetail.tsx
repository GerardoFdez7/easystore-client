import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainDetailCategory from '@organisms/detail-category/MainDetailCategory';
import { useTranslations } from 'next-intl';

export default function CategoryDetail({ id }: { id: string }) {
  const t = useTranslations('CategoryDetail');
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={`${t('welcomeDetailCategory')} · ${id}`}>
        <MainDetailCategory id={id} />
      </SidebarLayout>
    </div>
  );
}
