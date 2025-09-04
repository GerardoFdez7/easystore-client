import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloError } from '@apollo/client';
import { handleApolloError } from '../utils/error.handler';

export function getClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    const error = new ApolloError({ graphQLErrors, networkError });
    handleApolloError(error);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
  });
}
