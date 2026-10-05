'use client';

import { useMemo } from 'react';
import { SortOrder } from '@graphql/generated';
import { slugToName } from '@lib/utils/path-utils';
import { useCategoriesTree } from './useCategoriesTree';

interface CategoryInfoSource {
  name: string;
  subCategories?: CategoryInfoSource[];
}

function findCategoryByPath(
  hierarchy: CategoryInfo[],
  targetPath: string,
): CategoryInfo | null {
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
}

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
  const { categories, loading, error } = useCategoriesTree({
    sortOrder: SortOrder.Asc,
  });

  // Build a comprehensive category map with hierarchy information
  const categoryHierarchy = useMemo(() => {
    const buildHierarchy = (
      cats: CategoryInfoSource[],
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
            ? buildHierarchy(cat.subCategories, currentPath)
            : undefined,
        };
      });
    };

    return buildHierarchy(categories);
  }, [categories]);

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
  }, [categoryPath, categoryHierarchy]);

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
  }, [categoryPath, categoryHierarchy]);

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
  }, [categoryPath, categoryHierarchy]);

  return {
    breadcrumbItems,
    siblingCategories,
    currentCategorySiblings,
    categoryHierarchy,
    loading,
    error,
  };
}
