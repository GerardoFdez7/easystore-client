import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export function getClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  });
}
