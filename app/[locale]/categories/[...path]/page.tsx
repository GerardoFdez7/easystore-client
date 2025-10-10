'use client';

import { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Categories from '@templates/categories/Categories';
import CategoryDetail from '@templates/categories/CategoryDetail';

/**
 * Nested Category page component
 * Handles dynamic category paths and renders the appropriate template
 * based on URL parameters (edit/add) or shows the categories list
 */
export default function NestedCategoryPage() {
  const params = useParams<{ path?: string[] }>();
  const searchParams = useSearchParams();

  const categoryPath = useMemo(() => {
    return (params?.path || []).map((segment) => decodeURIComponent(segment));
  }, [params?.path]);

  const isEdit = searchParams.get('edit') === 'true';
  const isAdd = searchParams.get('add') === 'true';
  const shouldShowDetail = isEdit || isAdd;

  // If edit or add parameters are present, show CategoryDetail template
  if (shouldShowDetail) {
    const lastCategoryId = categoryPath[categoryPath.length - 1];
    const parentId =
      categoryPath.length > 1
        ? categoryPath[categoryPath.length - 2]
        : undefined;

    return (
      <CategoryDetail
        id={isAdd ? 'new' : lastCategoryId}
        parentId={isAdd ? lastCategoryId : parentId}
      />
    );
  }

  // Otherwise, show the regular Categories template
  return <Categories categoryPath={categoryPath} />;
}
