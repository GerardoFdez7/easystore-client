'use client';

import { useMemo } from 'react';
import { SortOrder } from '@graphql/generated';
import { nameToSlug } from '@lib/utils/path-utils';
import { createCategoryPathIdMap } from './categoryLookup';
import { useCategoriesTree } from './useCategoriesTree';

/**
 * Hook to resolve category ID from a path of category slugs
 * Simple logic:
 * - No selection = null (default query for root categories)
 * - Selection = use selected category ID as parentId
 * @param categoryPath - Array of category slugs (e.g., ['homegoods', 'furniture'])
 * @returns The resolved parent category ID and loading state
 */
export function useCategoryByPath(categoryPath: string[] = []) {
  const { categories, loading, error } = useCategoriesTree({
    sortOrder: SortOrder.Asc,
  });

  const categoryMap = useMemo(
    () => createCategoryPathIdMap(categories),
    [categories],
  );

  // Simple resolution logic
  const resolvedParentId = useMemo(() => {
    if (categoryPath.length === 0) {
      return null; // No selection = show root categories
    }

    // Get the last category in the path - this is what the user selected
    const lastSlug = categoryPath[categoryPath.length - 1];
    const lastCategoryName = nameToSlug(lastSlug);

    // Try multiple lookup strategies
    const lookupKeys = [
      lastSlug,
      lastCategoryName.toLowerCase(),
      lastSlug.toLowerCase(),
      lastCategoryName,
    ];

    let selectedCategoryId = null;
    for (const key of lookupKeys) {
      selectedCategoryId = categoryMap.get(key);
      if (selectedCategoryId) break;
    }
    return selectedCategoryId || null;
  }, [categoryPath, categoryMap]);

  return {
    parentId: resolvedParentId,
    loading,
    error,
    categories,
  };
}
