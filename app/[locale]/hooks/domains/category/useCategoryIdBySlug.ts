'use client';

import { useMemo } from 'react';
import { SortOrder } from '@graphql/generated';
import { nameToSlug } from '@lib/utils/path-utils';
import { createCategorySlugIdMap } from './categoryLookup';
import { useCategoriesTree } from './useCategoriesTree';

/**
 * Hook to resolve category ID from a category slug
 * @param slug - Category slug (e.g., 'electronics', 'home-goods')
 * @returns The resolved category ID and loading state
 */
export function useCategoryIdBySlug(slug?: string) {
  const { categories, loading, error } = useCategoriesTree({
    enabled: Boolean(slug),
    sortOrder: SortOrder.Asc,
  });

  const slugToIdMap = useMemo(
    () => createCategorySlugIdMap(categories),
    [categories],
  );

  // Resolve the category ID from the slug
  const categoryId = useMemo(() => {
    if (!slug) return null;

    // Try multiple lookup strategies
    const lookupKeys = [slug, slug.toLowerCase(), nameToSlug(slug)];

    for (const key of lookupKeys) {
      const id = slugToIdMap.get(key);
      if (id) return id;
    }

    return null;
  }, [slug, slugToIdMap]);

  return {
    categoryId,
    loading,
    error,
    found: !!categoryId,
  };
}

export default useCategoryIdBySlug;
