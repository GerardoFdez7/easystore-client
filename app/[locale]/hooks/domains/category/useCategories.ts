'use client';

import { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  FindAllCategoriesDocument,
  FindAllCategoriesQuery,
  FindAllCategoriesQueryVariables,
  SortBy,
  SortOrder,
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

export type UseCategoriesOptions = CategoryPageOptions;

type GqlCategory = NonNullable<
  FindAllCategoriesQuery['getAllCategories']
>['categories'][number];

// Default Select
export interface CategorySummary {
  id: string;
  name: string;
  cover: string;
  count: number;
}

interface UseCategoriesConfig<T> {
  select?: (list: GqlCategory[]) => T[];
}

const mapToSummary = (c: GqlCategory): CategorySummary => ({
  id: c.id,
  name: c.name,
  cover: c.cover || '',
  count: Array.isArray(c.subCategories) ? c.subCategories.length : 0,
});

/**
 * Generic hook for fetching and managing categories with pagination
 * @param opts - Options for filtering, sorting, and pagination
 * @param config - Configuration for data transformation
 * @returns Categories data with pagination and loading states
 */
export function useCategories<T = CategorySummary>(
  opts: UseCategoriesOptions = {},
  config?: UseCategoriesConfig<T>,
) {
  const options = useStableCategoryPageOptions(opts);
  const resetKey = JSON.stringify([
    options.name ?? '',
    options.parentId || null,
    options.sortBy ?? SortBy.Name,
    options.sortOrder ?? SortOrder.Asc,
    options.includeSubcategories ?? true,
  ]);
  const pagination = useCategoryPagination({
    initialPage: options.page ?? 1,
    resetKey,
  });
  const { page } = pagination;

  const variables: FindAllCategoriesQueryVariables = useMemo(
    () =>
      createCategoryPageVariables(
        options,
        page,
        options.includeSubcategories ?? true,
      ),
    [options, page],
  );

  const query = useQuery<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >(FindAllCategoriesDocument, {
    variables,
    ...categoryQueryOptions,
  });
  const { data, fetchMore } = query;

  const list = useMemo(() => getCategoryList<GqlCategory>(data), [data]);

  const select = config?.select;

  const items = useMemo(
    () =>
      selectCategoryItems(list, select, mapToSummary as (c: GqlCategory) => T),
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
      });
    },
    [fetchMore, options.includeSubcategories, variables],
  );

  return useCategoryResult(
    items,
    list,
    query,
    pagination,
    fetchNextPage,
    false,
  );
}
