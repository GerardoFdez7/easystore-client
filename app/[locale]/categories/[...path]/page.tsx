'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Categories from '@templates/categories/Categories';

/**
 * Nested Category page component
 * Handles dynamic category paths and renders the categories template
 * with the decoded category path segments
 */
export default function NestedCategoryPage() {
  const params = useParams<{ path?: string[] }>();

  const categoryPath = useMemo(() => {
    return (params?.path || []).map((segment) => decodeURIComponent(segment));
  }, [params?.path]);

  return <Categories categoryPath={categoryPath} />;
}
