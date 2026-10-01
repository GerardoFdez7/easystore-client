'use client';

import { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindCategoriesForPickerDocument,
  FindCategoriesForPickerQuery,
  FindCategoriesForPickerQueryVariables,
} from '@graphql/generated';
import {
  categoryQueryOptions,
  createCategoryPageVariables,
  getCategoryList,
  selectCategoryItems,
  useCategoryPagination,
  useCategoryResult,
  useStableCategoryPageOptions,
  type CategoryPageOptions,
} from './categoryPagination';

export type UseCategoriesForPickerOptions = CategoryPageOptions;

type GqlCategory = NonNullable<
  FindCategoriesForPickerQuery['getAllCategories']
>['categories'][number];

// Minimal category summary for picker
export interface CategoryPickerSummary {
  id: string;
  name: string;
  cover?: string | '';
  count?: number;
}

interface UseCategoriesForPickerConfig<T> {
  select?: (list: GqlCategory[]) => T[];
}

const mapToPickerSummary = (c: GqlCategory): CategoryPickerSummary => ({
  id: c.id,
  name: c.name,
  cover: c.cover || '',
});

/**
 * Hook for fetching categories with minimal fields for picker components
 * @param opts - Options for filtering, sorting, and pagination
 * @param config - Configuration for data transformation
 * @returns Categories data with pagination and loading states
 */
export function useCategoriesForPicker<T = CategoryPickerSummary>(
  opts: UseCategoriesForPickerOptions = {},
  config?: UseCategoriesForPickerConfig<T>,
) {
  const options = useStableCategoryPageOptions(opts);
  const resetKey = JSON.stringify([
    options.name,
    options.parentId,
    options.sortBy,
    options.sortOrder,
    options.includeSubcategories,
  ]);
  const pagination = useCategoryPagination({
    initialPage: options.page ?? 1,
    resetKey,
  });
  const { page } = pagination;

  const variables: FindCategoriesForPickerQueryVariables = useMemo(
    () =>
      createCategoryPageVariables(options, page, options.includeSubcategories),
    [options, page],
  );

  const query = useQuery<
    FindCategoriesForPickerQuery,
    FindCategoriesForPickerQueryVariables
  >(FindCategoriesForPickerDocument, {
    variables,
    ...categoryQueryOptions,
    context: {
      queryDeduplication: false,
    },
  });
  const { data, fetchMore } = query;

  const list = useMemo(() => getCategoryList<GqlCategory>(data), [data]);

  const select = config?.select;

  const items = useMemo(
    () =>
      selectCategoryItems(
        list,
        select,
        mapToPickerSummary as (c: GqlCategory) => T,
      ),
    [list, select],
  );

  const fetchNextPage = useCallback(
    async (nextPage: number) => {
      await fetchMore({
        variables: {
          ...variables,
          page: nextPage,
          includeSubcategories: options.includeSubcategories ?? true,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.getAllCategories?.categories) return prev;

          return {
            ...prev,
            getAllCategories: {
              ...prev.getAllCategories,
              categories: [
                ...(prev.getAllCategories?.categories || []),
                ...fetchMoreResult.getAllCategories.categories,
              ],
              hasMore: fetchMoreResult.getAllCategories.hasMore,
              total: fetchMoreResult.getAllCategories.total,
            },
          };
        },
      });
    },
    [fetchMore, options.includeSubcategories, variables],
  );

  return useCategoryResult(items, list, query, pagination, fetchNextPage, true);
}
