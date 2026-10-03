'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import { getOperationAST, type DocumentNode } from 'graphql';
import { graphql, HttpResponse } from 'msw';
import getClient from '../apollo/client';
import { graphqlUri, link } from '../apollo/link';

type ApolloMock = {
  request: { query: DocumentNode; variables?: Record<string, unknown> };
  result?:
    | { data?: unknown; errors?: unknown }
    | ((variables: Record<string, unknown>) => {
        data?: unknown;
        errors?: unknown;
      });
  error?: Error;
  delay?: number;
};

const storyFixtureHeader = 'x-storybook-fixture-id';

/**
 * MSW handlers are process-wide, while Storybook can render several stories at
 * once (notably when Vitest runs browser stories in parallel). Keep fixtures
 * keyed by a request header instead of replacing a module-global active list.
 */
const mocksByFixtureId = new Map<string, readonly ApolloMock[]>();

let nextFixtureId = 0;

const sameVariables = (
  expected: Record<string, unknown> | undefined,
  received: Record<string, unknown>,
) => JSON.stringify(expected ?? {}) === JSON.stringify(received);

const findMock = (
  mocks: readonly ApolloMock[] | undefined,
  operationName: string,
  variables: Record<string, unknown>,
) => {
  return mocks?.find((mock) => {
    const operation = getOperationAST(mock.request.query)?.name?.value;
    return (
      operation === operationName &&
      sameVariables(mock.request.variables, variables)
    );
  });
};

export const ApolloMswMocks = ({
  children,
  mocks,
}: {
  children: ReactNode;
  mocks: ApolloMock[];
}) => {
  const [fixtureId] = useState(() => {
    nextFixtureId += 1;
    return `storybook-${nextFixtureId}`;
  });

  // Registration happens during render so descendants can issue a request from
  // an effect in the same commit. Cleanup prevents stale stories retaining data.
  mocksByFixtureId.set(fixtureId, mocks);

  useEffect(() => {
    return () => {
      mocksByFixtureId.delete(fixtureId);
    };
  }, [fixtureId]);

  const client = useMemo(() => {
    const fixtureLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        [storyFixtureHeader]: fixtureId,
      },
    }));
    const storybookClient = getClient();
    storybookClient.setLink(fixtureLink.concat(link));
    return storybookClient;
  }, [fixtureId]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

if (!graphqlUri) {
  throw new Error(
    'NEXT_PUBLIC_GRAPHQL_URI must be defined for Storybook Apollo MSW mocks.',
  );
}

export const apolloMswHandler = graphql
  .link(graphqlUri)
  .operation(async ({ operationName, request, variables }) => {
    const fixtureId = request.headers.get(storyFixtureHeader);
    const mock = findMock(
      fixtureId ? mocksByFixtureId.get(fixtureId) : undefined,
      operationName,
      variables,
    );
    if (!mock) return;
    if (mock.delay === Infinity) return new Promise<never>(() => undefined);
    if (mock.delay)
      await new Promise((resolve) => setTimeout(resolve, mock.delay));
    if (mock.error) return HttpResponse.error();

    const result =
      typeof mock.result === 'function' ? mock.result(variables) : mock.result;
    return HttpResponse.json((result ?? { data: {} }) as never);
  });
