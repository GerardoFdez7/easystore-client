'use client';

import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  FindAllCategoriesDocument,
  FindAllCategoriesQuery,
  FindAllCategoriesQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';

export type UseCategoriesOptions = {
  page?: number;
  limit?: number;
  name?: string;
  parentId?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};

type GqlCategory = NonNullable<
  FindAllCategoriesQuery['getAllCategories']
>['categories'][number];

// Default Select
export type CategorySummary = {
  name: string;
  cover?: string;
  count: number;
};

const mapToSummary = (c: GqlCategory): CategorySummary => ({
  name: c.name,
  cover: c.cover ?? undefined,
  count: Array.isArray(c.subCategories) ? c.subCategories.length : 0,
});

//  Generic hook: you can request the shape you want with `select`
export function useCategories<T = CategorySummary>(
  opts: UseCategoriesOptions = {},
  config?: { select?: (list: GqlCategory[]) => T[] },
) {
  const variables: FindAllCategoriesQueryVariables = {
    page: opts.page ?? 1,
    limit: opts.limit ?? 25,
    name: opts.name ?? '',
    parentId: opts.parentId ?? '',
    sortBy: opts.sortBy ?? SortBy.Name,
    sortOrder: opts.sortOrder ?? SortOrder.Asc,
  };

  const { data, loading, error, refetch, fetchMore, networkStatus } = useQuery<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >(FindAllCategoriesDocument, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const list = useMemo(
    () => (data?.getAllCategories?.categories ?? []) as GqlCategory[],
    [data?.getAllCategories?.categories],
  );

  const select = config?.select;

  const items = useMemo<T[]>(() => {
    if (select) return select(list);
    return list.map(mapToSummary) as unknown as T[];
  }, [list, select]);

  return {
    items,
    raw: list,
    total: data?.getAllCategories?.total ?? 0,
    hasMore: data?.getAllCategories?.hasMore ?? false,
    loading,
    error,
    refetch,
    fetchMore,
    networkStatus,
  };
}
