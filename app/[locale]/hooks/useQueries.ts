'use client';

import {
  QueryResult,
  useQuery,
  OperationVariables,
  WatchQueryFetchPolicy,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { GraphQLFormattedError } from 'graphql/error';

type UseGraphQLResult<TResult, TVariables extends OperationVariables> = Omit<
  QueryResult<TResult, TVariables>,
  'data' | 'loading'
> & {
  errors?: readonly GraphQLFormattedError[];
  data: TResult | undefined;
  isLoading: boolean;
};

interface UseGraphQLOptions {
  fetchPolicy?: WatchQueryFetchPolicy;
  nextFetchPolicy?: WatchQueryFetchPolicy;
  notifyOnNetworkStatusChange?: boolean;
  pollInterval?: number;
}

const useGraphQLQueries = <
  TResult,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  variables?: TVariables,
  options?: UseGraphQLOptions,
): UseGraphQLResult<TResult, TVariables> => {
  const { data, error, loading, ...rest } = useQuery<TResult, TVariables>(
    query,
    {
      variables,
      errorPolicy: 'all',
      fetchPolicy: options?.fetchPolicy || 'cache-first',
      nextFetchPolicy: options?.nextFetchPolicy || 'cache-first',
      notifyOnNetworkStatusChange:
        options?.notifyOnNetworkStatusChange || false,
      pollInterval: options?.pollInterval,
      onError: (error) => {
        console.error('GraphQL Error:', error);
      },
    },
  );

  return {
    data: data ?? undefined,
    errors: error?.graphQLErrors as
      | readonly GraphQLFormattedError[]
      | undefined,
    isLoading: loading,
    ...rest,
  };
};

export default useGraphQLQueries;
