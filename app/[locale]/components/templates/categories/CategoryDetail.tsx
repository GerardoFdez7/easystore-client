'use client';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainDetailCategory from '@organisms/categories/detail/MainDetailCategory';
import { useTranslations } from 'next-intl';
import useCategory from '@hooks/domains/category/useCategory';

export default function CategoryDetail({ id }: { id: string }) {
  const t = useTranslations('CategoryDetail');
  const isNew = id === 'new';
  const { category } = useCategory(isNew ? undefined : id);

  const title =
    !isNew && category?.name
      ? `${t('welcomeDetailCategory')} · ${category.name}`
      : t('welcomeDetailCategory');

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={title}>
        <MainDetailCategory id={id} />
      </SidebarLayout>
    </div>
  );
}
