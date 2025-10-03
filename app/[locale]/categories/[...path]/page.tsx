'use client';

import { useParams } from 'next/navigation';
import MainCategory from '@organisms/categories/MainCategory';

export default function NestedCategoryPage() {
  const params = useParams<{ path?: string[] }>();
  const categoryPath = params?.path || [];

  return <MainCategory categoryPath={categoryPath} />;
}
