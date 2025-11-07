'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Dices, Plus, Search, AlertTriangle } from 'lucide-react';
import { SortBy, SortOrder } from '@graphql/generated';
import { useCategories, useCategoryByPath } from '@hooks/domains/category';
import { getCurrentPathDepth } from '@lib/utils/path-utils';
import EmptyState from '@molecules/shared/EmptyState';
import CategoryGrid from '@molecules/categories/CategoryGrid';
import CategoryTree from '@molecules/categories/CategoryTree';
import CategoryControls from '@molecules/categories/CategoryControls';
import CategoryBreadcrumb from '@molecules/categories/CategoryBreadcrumb';
import LoadMoreButton from '@atoms/shared/LoadMoreButton';
import useDriverTourCategories from '@hooks/driver/useDriverTourCategories';

interface MainCategoryProps {
  categoryPath?: string[];
}

export default function MainCategory({ categoryPath = [] }: MainCategoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.UpdatedAt);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [treeOpen, setTreeOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('Category');
  const tDetail = useTranslations('CategoryDetail');
  const categoryPathDepth = getCurrentPathDepth();

  // Resolve parent ID from category path
  const { parentId, loading: pathLoading } = useCategoryByPath(categoryPath);

  // Fetch categories for the grid
  const {
    items: categories,
    loading: categoriesLoading,
    isLoadingMore,
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
  const addHref = useMemo(() => {
    if (categoryPath.length > 0) {
      return `/categories/${parentPath}?add=true`;
    }
    return newHref;
  }, [categoryPath, parentPath, newHref]);
  const editHref = useMemo(() => {
    if (categoryPath.length > 0) {
      return `/categories/${parentPath}?edit=true`;
    }
    return undefined;
  }, [categoryPath, parentPath]);

  const isLoading = useMemo(
    () => categoriesLoading || pathLoading,
    [categoriesLoading, pathLoading],
  );
  const controlsLoading = useMemo(
    () => categoriesLoading || pathLoading || !!error,
    [categoriesLoading, pathLoading, error],
  );

  // initialize categories tour (client-side hook)
  useDriverTourCategories();

  const handleCreateCategory = useCallback(() => {
    router.push(newHref);
  }, [router, newHref]);

  if (
    categoryPath.length === 0 &&
    categories.length === 0 &&
    !searchTerm.trim() &&
    !isLoading
  ) {
    return (
      <main
        className="mx-auto w-full px-4"
        role="main"
        aria-labelledby="categories-title"
      >
        <div data-tour="categories-add">
          <EmptyState
            icon={Dices}
            title={t('noCategoriesTitle')}
            description={t('noCategoriesDescription')}
            buttonText={t('createCategory')}
            onButtonClick={handleCreateCategory}
          />
        </div>
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
          <div data-tour="categories-breadcrumb">
            <CategoryBreadcrumb categoryPath={categoryPath} />
          </div>
        )}
        <div data-tour="categories-controls">
          <CategoryControls
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            updateSortBy={handleSortByChange}
            sortOrder={sortOrder}
            updateSortOrder={handleSortOrderChange}
            searchPlaceholder={t('searchPlaceholder')}
            addButtonHref={addHref}
            addButtonText={
              categoryPath.length === 0
                ? t('createCategory')
                : tDetail('addSubcategories')
            }
            showAddButton={categoryPathDepth < 10}
            editButtonHref={editHref}
            editButtonText={tDetail('editCategory')}
            showEditButton={!!editHref}
            onTreeToggle={handleTreeToggle}
            treeButtonText={t('categoryTreeButton')}
            loading={controlsLoading}
          />
        </div>
        {/* If there are categories but search returned no results */}
        {searchTerm.trim() && categories.length === 0 && !isLoading ? (
          <EmptyState
            icon={Search}
            title={t('noSearchResultsTitle')}
            description={t('noSearchResultsDescription')}
          />
        ) : categoryPath.length === 10 &&
          categories.length === 0 &&
          !isLoading ? (
          <EmptyState
            icon={AlertTriangle}
            title={t('maxDepthReachedTitle')}
            description={t('maxDepthReachedDescription')}
          />
        ) : categoryPath.length > 0 && categories.length === 0 && !isLoading ? (
          <EmptyState
            icon={Dices}
            title={t('noSubcategoriesTitle')}
            description={t('noSubcategoriesDescription')}
            buttonText={
              categoryPathDepth < 10 ? tDetail('addSubcategories') : undefined
            }
            onButtonClick={
              categoryPathDepth < 10 ? () => router.push(addHref) : undefined
            }
            buttonIcon={categoryPathDepth < 10 ? Plus : undefined}
          />
        ) : (
          <div data-tour="categories-grid">
            <CategoryGrid
              categories={categories}
              loading={categoriesLoading}
              isLoadingMore={isLoadingMore}
              query={searchTerm}
              parentPath={parentPath}
              limit={25}
              hideCount={!!searchTerm.trim()}
            />
          </div>
        )}
        {hasMore && (
          <div className="flex justify-center" data-tour="categories-load-more">
            <LoadMoreButton
              onClick={handleLoadMoreClick}
              isLoading={isLoadingMore}
              disabled={!hasMore}
            />
          </div>
        )}
      </div>
      <div data-tour="categories-tree">
        <CategoryTree open={treeOpen} onOpenChange={setTreeOpen} />
      </div>
    </main>
  );
}
