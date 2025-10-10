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
 * Hook to resolve category ID from a category slug
 * @param slug - Category slug (e.g., 'electronics', 'home-goods')
 * @returns The resolved category ID and loading state
 */
export function useCategoryIdBySlug(slug?: string) {
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
    skip: !slug,
  });

  const categories = useMemo(
    () => (data?.getAllCategories?.categories ?? []) as GqlCategory[],
    [data?.getAllCategories?.categories],
  );

  // Build a map of category slugs to IDs for efficient lookup
  const slugToIdMap = useMemo(() => {
    const map = new Map<string, string>();

    const addCategoriesRecursively = (category: GqlCategory) => {
      // Create slug from category name
      const categorySlug = nameToSlug(category.name);

      // Store mapping
      map.set(categorySlug, category.id);

      // Also store by lowercase name for fallback
      map.set(category.name.toLowerCase(), category.id);

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
