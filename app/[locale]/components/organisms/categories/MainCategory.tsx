'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import CategoryGrid from '@molecules/categories/CategoryGrid';
import CategoryTree from '@molecules/categories/CategoryTree';
import CategoryControls from '@molecules/categories/CategoryControls';
import { useCategories, useCategoriesTree } from '@hooks/domains/category';
import { SortBy, SortOrder } from '@graphql/generated';

const withLocale = (locale: string | undefined, path: string) =>
  locale ? `/${locale}${path}` : path;

type Props = {
  categoryPath?: string[];
};

export default function MainCategory({ categoryPath = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);

  const t = useTranslations('Category');
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
  const newHref = withLocale(locale, '/categories/new');

  // Determine parent ID based on category path
  const parentId = useMemo(() => {
    // For now, we'll use undefined to show parent categories
    // In a real implementation, you'd resolve the path to get the actual parent ID
    return undefined;
  }, [categoryPath]);

  // Fetch categories for the grid
  const {
    items: categories,
    loading: categoriesLoading,
    refetch: refetchCategories,
  } = useCategories({
    page: 1,
    limit: 25,
    name: searchTerm,
    parentId,
    sortBy,
    sortOrder,
  });

  // Fetch tree data for the sidebar
  const {
    categories: treeData,
    loading: treeLoading,
    error: treeError,
  } = useCategoriesTree({
    sortBy,
    sortOrder,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortByChange = (value: SortBy) => {
    setSortBy(value);
  };

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value);
  };

  const parentPath = categoryPath.join('/');

  return (
    <main className="2xl:m-5">
      <section className="mx-auto grid w-full max-w-screen-2xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_18rem] lg:px-8">
        <div className="flex flex-col gap-4">
          <CategoryControls
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            updateSortBy={handleSortByChange}
            sortOrder={sortOrder}
            updateSortOrder={handleSortOrderChange}
            searchPlaceholder={t('searchPlaceholder')}
            addButtonHref={newHref}
            addButtonText={t('addCategory')}
          />
          <CategoryGrid
            categories={categories}
            loading={categoriesLoading}
            query={searchTerm}
            parentPath={parentPath}
            limit={25}
          />
        </div>
        <div className="lg:pl-4">
          <CategoryTree />
        </div>
      </section>
    </main>
  );
}
