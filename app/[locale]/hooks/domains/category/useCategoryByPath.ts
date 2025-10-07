'use client';

import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindCategoriesTreeDocument,
  FindCategoriesTreeQuery,
  FindCategoriesTreeQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';
import { nameToSlug } from '@lib/utils/path-utils';

type GqlCategory = NonNullable<
  FindCategoriesTreeQuery['getAllCategories']
>['categories'][number];

/**
 * Hook to resolve category ID from a path of category slugs
 * Simple logic:
 * - No selection = null (default query for root categories)
 * - Selection = use selected category ID as parentId
 * @param categoryPath - Array of category slugs (e.g., ['homegoods', 'furniture'])
 * @returns The resolved parent category ID and loading state
 */
export function useCategoryByPath(categoryPath: string[] = []) {
  // Fetch root categories with all their subcategories to build the complete resolution map
  // Use the tree query to get complete category hierarchy
  const { data, loading, error } = useQuery<
    FindCategoriesTreeQuery,
    FindCategoriesTreeQueryVariables
  >(FindCategoriesTreeDocument, {
    variables: {
      sortBy: SortBy.Name,
      sortOrder: SortOrder.Asc,
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const categories = useMemo(
    () => (data?.getAllCategories?.categories ?? []) as GqlCategory[],
    [data?.getAllCategories?.categories],
  );

  // Build a simple map of category names to IDs for efficient lookup
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();

    const addCategoriesRecursively = (category: GqlCategory) => {
      // Store by both original name and slug format
      const originalName = category.name.toLowerCase();
      const slugName = category.name.toLowerCase().replace(/\s+/g, '-');

      map.set(originalName, category.id);
      map.set(slugName, category.id);

      // Add subcategories recursively
      if (category.subCategories && category.subCategories.length > 0) {
        category.subCategories.forEach((subCategory) => {
          addCategoriesRecursively(subCategory as GqlCategory);
        });
      }
    };

    categories.forEach((category) => {
      addCategoriesRecursively(category);
    });

    return map;
  }, [categories]);

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
