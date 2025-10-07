import { memo } from 'react';
import { useTranslations } from 'next-intl';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainCategory from '@organisms/categories/MainCategory';

interface CategoryTemplateProps {
  categoryPath?: string[];
}

/**
 * Template component for the Categories page
 * Provides the main layout structure with header, sidebar, and category content
 */
function CategoryTemplate({ categoryPath }: CategoryTemplateProps) {
  const t = useTranslations('Category');

  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <HeaderDashboard />
      <SidebarLayout title={t('welcomeCategory')}>
        <MainCategory categoryPath={categoryPath} />
      </SidebarLayout>
    </div>
  );
}

export default memo(CategoryTemplate);
