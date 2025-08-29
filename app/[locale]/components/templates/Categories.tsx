import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainCategory from '@organisms/categories/MainCategory';
import { useTranslations } from 'next-intl';

export default function CategoryTemplate() {
  const t = useTranslations('Category');
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={t('welcomeCategory')}>
        <MainCategory />
      </SidebarLayout>
    </div>
  );
}
