'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Dices, Search } from 'lucide-react';
import { SortBy, SortOrder } from '@graphql/generated';
import { useCategories, useCategoryByPath } from '@hooks/domains/category';
import EmptyState from '@molecules/shared/EmptyState';
import CategoryGrid from '@molecules/categories/CategoryGrid';
import CategoryTree from '@molecules/categories/CategoryTree';
import CategoryControls from '@molecules/categories/CategoryControls';
import CategoryBreadcrumb from '@molecules/categories/CategoryBreadcrumb';
import LoadMoreButton from '@atoms/shared/LoadMoreButton';

interface MainCategoryProps {
  categoryPath?: string[];
}

export default function MainCategory({ categoryPath = [] }: MainCategoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [treeOpen, setTreeOpen] = useState(false);
  const t = useTranslations('Category');

  // Resolve parent ID from category path
  const { parentId, loading: pathLoading } = useCategoryByPath(categoryPath);

  // Fetch categories for the grid
  const {
    items: categories,
    loading: categoriesLoading,
    error,
    hasMore,
    handleLoadMore,
    resetPage,
  } = useCategories({
    limit: 25,
    name: searchTerm,
    parentId: parentId || undefined,
    sortBy,
    sortOrder,
    includeSubcategories: !searchTerm.trim(), // Disable subcategories when searching
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      resetPage(); // Reset page when search changes
    },
    [resetPage],
  );

  const handleSortByChange = useCallback(
    (value: SortBy) => {
      setSortBy(value);
      resetPage(); // Reset page when sort changes
    },
    [resetPage],
  );

  const handleSortOrderChange = useCallback(
    (value: SortOrder) => {
      setSortOrder(value);
      resetPage(); // Reset page when sort order changes
    },
    [resetPage],
  );

  const handleTreeToggle = useCallback(() => {
    setTreeOpen((prev) => !prev);
  }, []);

  const handleLoadMoreClick = useCallback(() => {
    void handleLoadMore();
  }, [handleLoadMore]);

  // Reset page when parentId changes
  useEffect(() => {
    resetPage();
  }, [parentId, resetPage]);

  const parentPath = useMemo(() => categoryPath.join('/'), [categoryPath]);
  const newHref = useMemo(() => '/categories/new', []);
  const isLoading = useMemo(
    () => categoriesLoading || pathLoading,
    [categoriesLoading, pathLoading],
  );
  const controlsLoading = useMemo(
    () => categoriesLoading || pathLoading || !!error,
    [categoriesLoading, pathLoading, error],
  );

  if (
    categoryPath.length === 0 &&
    categories.length === 0 &&
    !searchTerm.trim() &&
    !controlsLoading
  ) {
    return (
      <main
        className="mx-auto w-full px-4"
        role="main"
        aria-labelledby="categories-title"
      >
        <EmptyState
          icon={Dices}
          title={t('noCategoriesTitle')}
          description={t('noCategoriesDescription')}
        />
      </main>
    );
  }

  return (
    <main
      className="mx-auto w-full px-4"
      role="main"
      aria-labelledby="main-categories-title"
    >
      <div className="flex flex-col gap-4">
        {categoryPath.length > 0 && (
          <CategoryBreadcrumb categoryPath={categoryPath} />
        )}
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
          onTreeToggle={handleTreeToggle}
          treeButtonText={t('categoryTreeButton')}
          loading={controlsLoading}
        />
        {/* If there are categories but search returned no results */}
        {searchTerm.trim() && categories.length === 0 && !isLoading ? (
          <EmptyState
            icon={Search}
            title={t('noSearchResultsTitle')}
            description={t('noSearchResultsDescription')}
          />
        ) : categoryPath.length > 0 && categories.length === 0 && !isLoading ? (
          <EmptyState
            icon={Dices}
            title={t('noSubcategoriesTitle')}
            description={t('noSubcategoriesDescription')}
          />
        ) : (
          <CategoryGrid
            categories={categories}
            loading={isLoading}
            query={searchTerm}
            parentPath={parentPath}
            limit={25}
            hideCount={!!searchTerm.trim()}
          />
        )}
        {hasMore && (
          <div className="flex justify-center">
            <LoadMoreButton
              onClick={handleLoadMoreClick}
              isLoading={isLoading}
              disabled={!hasMore}
              aria-label={t('loadMoreCategories')}
            />
          </div>
        )}
      </div>
      <CategoryTree open={treeOpen} onOpenChange={setTreeOpen} />
    </main>
  );
}
