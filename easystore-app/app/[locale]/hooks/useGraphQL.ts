'use client';

import { QueryResult, useQuery, OperationVariables } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { GraphQLFormattedError } from 'graphql/error';

type UseGraphQLResult<TResult, TVariables extends OperationVariables> = Omit<
  QueryResult<TResult, TVariables>,
  'data'
> & {
  errors?: readonly GraphQLFormattedError[];
  data: TResult | undefined;
};

export const useGraphQL = <
  TResult,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  variables?: TVariables,
): UseGraphQLResult<TResult, TVariables> => {
  const { data, error, ...rest } = useQuery<TResult, TVariables>(query, {
    variables,
    errorPolicy: 'all',
    onError: (error) => {
      console.error('GraphQL Error:', error);
    },
  });

  return {
    data: data ?? undefined,
    errors: error?.graphQLErrors as
      | readonly GraphQLFormattedError[]
      | undefined,
    ...rest,
  };
};
