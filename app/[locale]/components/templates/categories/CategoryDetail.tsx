'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainDetailCategory from '@organisms/categories/detail/MainDetailCategory';
import useCategory from '@hooks/domains/category/useCategory';
import useCategoryIdBySlug from '@hooks/domains/category/useCategoryIdBySlug';
import BackButton from '@atoms/shared/BackButton';

interface CategoryDetailProps {
  id: string;
  parentId?: string;
}

export default function CategoryDetail({ id, parentId }: CategoryDetailProps) {
  const t = useTranslations('CategoryDetail');
  const searchParams = useSearchParams();

  const isEdit = searchParams.get('edit') === 'true';
  const isAdd = searchParams.get('add') === 'true';
  const isNew = id === 'new';

  // Resolve category slug to UUID if needed
  // When adding a subcategory, we need to fetch the parent category using parentId
  // When editing, we fetch the category being edited using id
  // When creating new (id === 'new'), we don't fetch any category
  const categorySlugToResolve = isAdd ? parentId : isNew ? undefined : id;

  const { categoryId: resolvedCategoryId } = useCategoryIdBySlug(
    categorySlugToResolve,
  );

  const { category } = useCategory(
    categorySlugToResolve ? resolvedCategoryId || undefined : undefined,
  );

  const getTitle = () => {
    if (isAdd && category?.name) {
      return `${t('addSubcategory')} ${category.name}`;
    }
    if (isEdit && category?.name) {
      return `${t('editCategory')} · ${category.name}`;
    }
    return t('welcomeDetailCategory');
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={getTitle()}>
        <BackButton />
        <MainDetailCategory
          categoryId={isNew ? undefined : (resolvedCategoryId ?? undefined)}
          parentId={isAdd ? (resolvedCategoryId ?? undefined) : undefined}
          isNew={isNew}
          isEdit={isEdit}
          isAdd={isAdd}
        />
      </SidebarLayout>
    </div>
  );
}
