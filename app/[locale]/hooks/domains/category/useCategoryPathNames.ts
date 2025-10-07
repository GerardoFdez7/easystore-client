'use client';

import { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindCategoriesTreeDocument,
  FindCategoriesTreeQuery,
  FindCategoriesTreeQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';
import { slugToName } from '@lib/utils/path-utils';

// Type for GraphQL category from FindCategoriesTreeQuery
type GqlCategory = NonNullable<
  FindCategoriesTreeQuery['getAllCategories']
>['categories'][number];

export interface CategoryInfo {
  name: string;
  slug: string;
  path: string;
  children?: CategoryInfo[];
}

interface BreadcrumbItem {
  name: string;
  path: string;
  fullPath: string[];
  parentPath: string[];
  children?: CategoryInfo[];
}

/**
 * Hook to resolve category names and build navigation hierarchy from a path
 * @param categoryPath - Array of category slugs (e.g., ['home-goods', 'furniture'])
 * @returns Category hierarchy information for breadcrumb navigation
 */
export function useCategoryPathNames(categoryPath: string[] = []) {
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

  // Build a comprehensive category map with hierarchy information
  const categoryHierarchy = useMemo(() => {
    const buildHierarchy = (
      cats: GqlCategory[],
      parentPath = '',
    ): CategoryInfo[] => {
      return cats.map((cat) => {
        const slug = cat.name.toLowerCase().replace(/\s+/g, '-');
        const currentPath = parentPath ? `${parentPath}/${slug}` : slug;

        return {
          name: cat.name,
          slug,
          path: currentPath,
          children: cat.subCategories
            ? buildHierarchy(cat.subCategories as GqlCategory[], currentPath)
            : undefined,
        };
      });
    };

    return buildHierarchy(
      (data?.getAllCategories?.categories as GqlCategory[]) || [],
    );
  }, [data?.getAllCategories?.categories]);

  // Find category by path - wrapped in useCallback to prevent useMemo dependencies from changing
  const findCategoryByPath = useCallback(
    (hierarchy: CategoryInfo[], targetPath: string): CategoryInfo | null => {
      for (const category of hierarchy) {
        if (category.path === targetPath) {
          return category;
        }
        if (category.children) {
          const found = findCategoryByPath(category.children, targetPath);
          if (found) return found;
        }
      }
      return null;
    },
    [],
  );

  // Build breadcrumb items from the current path
  const breadcrumbItems = useMemo(() => {
    if (categoryPath.length === 0) {
      return [];
    }

    const items: BreadcrumbItem[] = [];

    // Build cumulative paths and resolve names
    for (let i = 0; i < categoryPath.length; i++) {
      const currentPath = categoryPath.slice(0, i + 1).join('/');
      const fullPath = categoryPath.slice(0, i + 1);
      const parentPath = categoryPath.slice(0, i);
      const category = findCategoryByPath(categoryHierarchy, currentPath);

      if (category) {
        items.push({
          name: category.name,
          path: currentPath,
          fullPath,
          parentPath,
          children: category.children,
        });
      } else {
        // Fallback to slug-to-name conversion if category not found
        items.push({
          name: slugToName(categoryPath[i]),
          path: currentPath,
          fullPath,
          parentPath,
        });
      }
    }

    return items;
  }, [categoryPath, categoryHierarchy, findCategoryByPath]);

  // Get siblings for each level in the breadcrumb path
  const siblingCategories = useMemo(() => {
    const siblings: CategoryInfo[][] = [];

    for (let i = 0; i < categoryPath.length; i++) {
      if (i === 0) {
        // First level - siblings are root categories
        siblings.push(categoryHierarchy);
      } else {
        // Find parent category and get its children
        const parentPath = categoryPath.slice(0, i).join('/');
        const parentCategory = findCategoryByPath(
          categoryHierarchy,
          parentPath,
        );
        siblings.push(parentCategory?.children ?? []);
      }
    }

    return siblings;
  }, [categoryPath, categoryHierarchy, findCategoryByPath]);

  // Get siblings of the current category for dropdown navigation
  const currentCategorySiblings = useMemo(() => {
    if (categoryPath.length === 0) {
      return categoryHierarchy;
    }

    if (categoryPath.length === 1) {
      return categoryHierarchy;
    }

    // Find parent category and return its children
    const parentPath = categoryPath.slice(0, -1).join('/');
    const parentCategory = findCategoryByPath(categoryHierarchy, parentPath);

    return parentCategory?.children ?? [];
  }, [categoryPath, categoryHierarchy, findCategoryByPath]);

  return {
    breadcrumbItems,
    siblingCategories,
    currentCategorySiblings,
    categoryHierarchy,
    loading,
    error,
  };
}
