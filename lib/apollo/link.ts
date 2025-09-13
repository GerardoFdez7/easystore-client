import { HttpLink } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { handleApolloError } from '../utils/error.handler';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

const errorLink = new ErrorLink(({ error }) => {
  let graphQLErrors = null;
  let networkError = null;
  if (CombinedGraphQLErrors.is(error)) {
    graphQLErrors = error.errors;
  } else if (CombinedProtocolErrors.is(error)) {
    graphQLErrors = error.errors;
  } else {
    networkError = error;
  }
  handleApolloError(graphQLErrors, networkError);
});
export const link = errorLink.concat(httpLink);
