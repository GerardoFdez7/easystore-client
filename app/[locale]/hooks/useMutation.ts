'use client';

import {
  useMutation as useApolloMutation,
  OperationVariables,
  MutationHookOptions,
  MutationResult,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { GraphQLFormattedError } from 'graphql/error';

type UseGraphQLMutationResult<TResult> = Omit<
  MutationResult<TResult>,
  'data' | 'loading'
> & {
  errors?: readonly GraphQLFormattedError[];
  data: TResult | undefined;
  isLoading: boolean;
};

const useMutation = <
  TResult,
  TVariables extends OperationVariables = OperationVariables,
>(
  mutation: DocumentNode,
  defaultVariables?: TVariables,
  options?: MutationHookOptions<TResult, TVariables>,
): UseGraphQLMutationResult<TResult> & {
  mutate: ReturnType<typeof useApolloMutation<TResult, TVariables>>[0];
} => {
  const [mutate, { data, error, loading, ...rest }] = useApolloMutation<
    TResult,
    TVariables
  >(mutation, {
    variables: defaultVariables,
    errorPolicy: 'all',
    ...options,
    onError: (err) => {
      console.error('GraphQL Mutation Error:', err);
      options?.onError?.(err);
    },
  });

  return {
    mutate,
    data: data ?? undefined,
    errors: error?.graphQLErrors as
      | readonly GraphQLFormattedError[]
      | undefined,
    isLoading: loading,
    ...rest,
  };
};

export default useMutation;
